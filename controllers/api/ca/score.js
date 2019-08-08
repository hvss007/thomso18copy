var request = require('request');

var Users = require('../../../models/ca/CA_User');

var FinalUsers = require('../../../models/ca/CA_Temp_User');

exports.getNew = function(req, res) {
    Users.find()
    .select('access_token fb_id referrals bonus')
    .exec(function (err, allUsers) {
        if (err) return res.status(400).send({success:false, msg:'Unable to GET Users', error:err});
        if (allUsers.length > 0) {
            var allUsersResponseCounter = 0;
            function updateAllUsersResponseCounter() {
                allUsersResponseCounter = allUsersResponseCounter + 1;
                if (allUsersResponseCounter === allUsers.length) {
                    res.json('done');
                }
            }
            allUsers.map(function(eachUser) {
                var options = {
                    method: 'GET',
                    uri: `https://graph.facebook.com/me?fields=posts{likes.limit(0).summary(true),link}`,
                    qs: {
                        access_token: eachUser.access_token
                    }
                }
                request(options, function(err, response, body) {
                    console.log(`https://graph.facebook.com/me?fields=posts{likes.limit(0).summary(true),link}`, 'URL');
                    if (err) {
                        console.log(err, `Request Failed. User ID ${eachUser.fb_id} & Post_ID ${post_id}`);
                        updateAllUsersResponseCounter();
                    } else if(response && response.body){
                        console.log('response');
                        var parseData = JSON.parse(response.body);
                        if ( parseData.posts && parseData.posts.data) {
                            var totalLikes = 0;
                            var totalScore = 0;
                            var totalShares = 0;
                            for (var x=0; x < parseData.posts.data.length; x++ ) {
                                if (parseData.posts.data[x].link && parseData.posts.data[x].likes && parseData.posts.data[x].likes.summary && parseData.posts.data[x].likes.summary.total_count !== undefined) {
                                    var thisLink = parseData.posts.data[x].link.substring(25, 41);
                                    if (thisLink === "thomsoiitroorkee") {
                                        console.log(parseData.posts.data[x].link);
                                        var likes = parseData.posts.data[x].likes.summary.total_count;
                                        var score = 0;
                                        if(likes > 4){
                                            if(likes > 50) {
                                                score = 50 + (likes-50)*4 + 13;
                                            } else {
                                                score = 13 + likes*2;
                                            }
                                        } else {
                                            score = 13 + likes;
                                        }
                                        totalLikes = totalLikes + likes;
                                        totalScore = totalScore + score;
                                        totalShares = totalShares + 1;
                                    }
                                }
                                if ( x === parseData.posts.data.length - 1) {
                                    var bonus = 0;
                                    if (typeof(eachUser.bonus) === "number") {
                                        bonus = eachUser.bonus;
                                    }
                                    totalScore = totalScore + eachUser.referrals*23 + bonus;
                                    var updateData = {
                                        score: totalScore,
                                        likes: totalLikes,
                                        shares: totalShares
                                    }
                                    Users.update({fb_id: eachUser.fb_id}, updateData, function(err) {
                                        if(err){
                                            updateAllUsersResponseCounter();
                                            console.log(err, 'Find and Update Failed');
                                            return false;
                                        } else {
                                            console.log('Successfully Updated ID: '+eachUser.fb_id);
                                            updateAllUsersResponseCounter();
                                            return true
                                        }
                                    })
                                    updateAllUsersResponseCounter();
                                }
                            }
                        } else {
                            updateAllUsersResponseCounter();
                        }
                    } else {
                        updateAllUsersResponseCounter();
                    }
                })
           })
        } else {
            res.status(400).send({success: false, msg: 'No Users Found'});
        }
    });
};

exports.getFinal = function(req, res) {
    FinalUsers.find({fb_access_token: {$ne: null}})
    .select('fb_access_token email referrals bonus')
    .exec(function (err, allUsers) {
        if (err) return res.status(400).send({success:false, msg:'Unable to GET Users', error:err});
        // console.log(allUsers);
        if (allUsers.length > 0) {
            var allUsersResponseCounter = 0;
            function updateAllUsersResponseCounter() {
                allUsersResponseCounter = allUsersResponseCounter + 1;
                if (allUsersResponseCounter === allUsers.length) {
                    res.json('done');
                }
            }
            allUsers.map(function(eachUser) {
                var options = {
                    method: 'GET',
                    uri: `https://graph.facebook.com/me?fields=posts.since(2018-07-30).limit(200){likes.limit(0).summary(true),link}`,
                    qs: {
                        access_token: eachUser.fb_access_token
                    }
                }
                request(options, function(err, response, body) {
                    if (err) {
                        console.log(err, `Request Failed. User ID ${eachUser.email}`);
                        updateAllUsersResponseCounter();
                    } else if(response && response.body){
                        // console.log('response');
                        var parseData = JSON.parse(response.body);
                        if ( parseData.posts && parseData.posts.data) {
                            var totalLikes = 0;
                            var totalScore = 0;
                            var totalShares = 0;
                            for (var x=0; x < parseData.posts.data.length; x++ ) {
                                if (parseData.posts.data[x].link && parseData.posts.data[x].likes && parseData.posts.data[x].likes.summary && parseData.posts.data[x].likes.summary.total_count !== undefined) {
                                    var thisLink = parseData.posts.data[x].link.substring(25, 41);
                                    if (thisLink === "thomsoiitroorkee") {
                                        // console.log(parseData.posts.data[x].link);
                                        var likes = parseData.posts.data[x].likes.summary.total_count;
                                        var score = 0;
                                        if(likes > 4){
                                            if(likes > 50) {
                                                score = 50 + (likes-50)*4 + 13;
                                            } else {
                                                score = 13 + likes*2;
                                            }
                                        } else {
                                            score = 13 + likes;
                                        }
                                        totalLikes = totalLikes + likes;
                                        totalScore = totalScore + score;
                                        totalShares = totalShares + 1;
                                    }
                                }
                                if ( x === parseData.posts.data.length - 1) {
                                    var bonus = 0;
                                    if (typeof(eachUser.bonus) === "number") {
                                        bonus = eachUser.bonus;
                                    }
                                    var fb_score = totalScore;
                                    totalScore = totalScore + eachUser.referrals*23 + bonus;
                                    var updateData = {
                                        score: totalScore,
                                        fb_likes: totalLikes,
                                        fb_shares: totalShares,
                                        fb_score: fb_score
                                    };
                                    // console.log('updateData', updateData);
                                    FinalUsers.update({email: eachUser.email}, updateData, function(err) {
                                        if(err){
                                            updateAllUsersResponseCounter();
                                            console.log(err, 'Find and Update Failed');
                                            return false;
                                        } else {
                                            // console.log('Successfully Updated ID: '+eachUser.fb_id);
                                            updateAllUsersResponseCounter();
                                            return true
                                        }
                                    })
                                    updateAllUsersResponseCounter();
                                }
                            }
                        } else {
                            updateAllUsersResponseCounter();
                        }
                    } else {
                        updateAllUsersResponseCounter();
                    }
                })
           })
        } else {
            res.status(400).send({success: false, msg: 'No Users Found'});
        }
    });
};
