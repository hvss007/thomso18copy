var request = require('request');
var Temp_User = require('../../../models/ca/CA_Temp_User');

var Ideas = require('../../../models/ca/CA_Temp_Idea');

var client_id = process.env.REACT_APP_FB_ID;
var client_secret = process.env.FACEBOOK_APP_SECRET;

// Get User Data
exports.getData = function (req, res) {
    Temp_User.findOne({
        email: req.locals.email
    })
        .select('name email gender verified ca_id bonus referrals score college image')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else {
                res.json({ success: true, msg: 'User Data Found', body: user });
            }
        });
};

exports.update_image = function (req, res) {
    console.log(req)
    if(req && req.body && req.body.format){
        let data = {
            id:req.locals._id,
            email:req.locals.email,
            img:req.body.image,
            format:req.body.format
        }
        let baseImg = data.img.split(',')[1]
        let binaryData = new Buffer(baseImg, 'base64');
        let ext = data.format.split('/')[1]
        let updateData = {image : `${data.id}.${ext}`}
        require("fs").writeFile(`./public/img/ProfileImage/${updateData.image}`, binaryData, function(err) {
            if(err) return res.status(400).send({ success: false, msg:"something went wrong"})
            else{
                Temp_User.findOneAndUpdate({
                    email:data.email
                }, updateData)
                    .exec(function(err){
                        if (err) return status(401).send({ success: false, msg: "Unable To Upload Image. Please Try Again." })
                        res.json({ success: true, msg: "Image Uploaded Successfully." })
                    })
            }
        })
    }else res.status(400).send({ success: false, msg: 'Invalid Data' });
}

/* GET all Posts */
exports.getPosts = function (req, res) {
    var fb_auth_token = process.env.FB_ACCESS_TOKEN;
    if (fb_auth_token) {
        request(`https://graph.facebook.com/v3.1/171774543014513?fields=posts.since(2018-07-30){created_time,id,full_picture,message,link}&access_token=${fb_auth_token}`, function (err, response, body) {
            if (err) {
                console.log(err)
                return res.status(400).send({ success: false, msg: 'Facebook returned error.', error: err });
            }
            if (response.statusCode) {
                console.log('hel')
                return res.status(response.statusCode).send(body);
            }
            return res.status(400).send({ success: false, msg: 'Facebook didnt return status.' });
        })
    } else {
        res.status(400).send({ success: false, msg: 'Token Not Found' });
    }
};

exports.getUserPosts = function (req, res) 
{
    Temp_User.find({email: req.locals.email})
        .select('fb_id fb_access_token')
        .exec( function(err, user)
            {
                if(err) return res.status(400).send({ success: false, msg: 'Facebook returned error.', error: err })
                if(user)
                {
                    if(user.length>0)
                    {
                        user.map(function(eachUser) {
                            console.log(eachUser)
                            var options = {
                                method: 'GET',
                                uri: 'https://graph.facebook.com/v3.3/me?fields=posts.since(2018-07-30){created_time,id,full_picture,message,link,likes.summary(true)}',
                                qs: {
                                    access_token: eachUser.fb_access_token
                                }
                            }
                            request(options, function (err, response, body) {
                                if (err) {
                                    console.log(err)
                                    return res.status(400).send({ success: false, msg: 'Facebook returned error.', error: err });
                                }
                                if (response.statusCode) {
                                    console.log('returned user post')
                                    return res.status(response.statusCode).send(body);
                                }
                                return res.status(400).send({ success: false, msg: 'Facebook didnt return status.' });
                            })
                        })

                    }
                }
            })
}

/* Create Idea */
exports.postIdea = function (req, res) {
    if (req.body && req.body.title && req.body.body && req.locals._id) {
        var newData = {
            user: req.locals._id,
            email: req.locals.email,
            title: req.body.title,
            body: req.body.body
        }
        var newIdea = new Ideas(newData);
        newIdea.save(function (err, idea) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to Add Idea' });
            } else if (idea._id) {
                Temp_User.update({ _id: req.locals._id }, { $addToSet: { ideas: idea._id } })
                    .exec(function (err) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Cannot Append Idea', error: err });
                        }
                        return res.json({ success: true, msg: 'Idea Successfully Posted', body: idea });
                    })
            } else {
                return res.status(400).send({ success: false, msg: 'Idea ID Not Found', body: idea });
            }
        });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

/* Read All Ideas */
exports.getIdea = function (req, res) {
    Ideas.find({ email: req.locals.email, deleted: { $ne: true } })
        .select('title body comment updated_date')
        .sort({ 'updated_date': -1 })
        .exec(function (err, allIdeas) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Cannot GET Ideas', error: err });
            }
            res.json({ success: true, msg: 'Ideas', body: allIdeas });
        })
};

/* Update Idea */
exports.putIdea = function (req, res) {
    if (req.params.id) {
        if (req.body.title) {
            req.body.title = req.body.title.trim();
        }
        if (req.body.body) {
            req.body.body = req.body.body.trim();
        }
        var updateData = {
            title: req.body.title,
            body: req.body.body,
            updated_date: new Date()
        }
        if (req.body.title && req.body.body) {
            Ideas.findOneAndUpdate({ email: req.locals.email, _id: req.params.id }, updateData, { new: true })
                .select('title body comment')
                .exec(function (err, idea) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Cannot Update Idea', error: err });
                    }
                    return res.json({ success: true, msg: 'Successfully Updated', body: idea });
                })
        } else {
            return res.status(400).send({ success: false, msg: 'Invalid Data' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* Remove Idea */
exports.deleteIdea = function (req, res) {
    if (req.params.id) {
        var updateData = {
            deleted: true
        };
        Ideas.update({ email: req.locals.email, _id: req.params.id }, updateData)
            .exec(function (err) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Cannot Delete Idea', error: err });
                }
                return res.json({ success: true, msg: 'Successfully Deleted' });
            })
    } else {
        return res.status(400).send({ success: false, msg: 'No Post ID Specified' });
    }
};

/* GET Leaderboard */
exports.getLeaderboard = function (req, res) {
    Temp_User.find({ verified: true, blocked: { $ne: true } })
        .select('name college score')
        .sort({ 'score': -1 })
        .limit(10)
        .exec(function (err, allUsers) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Cannot GET Leaders', error: err });
            }
            res.json(allUsers);
        })
};

/* GET Rank */
exports.getRank = function (req, res) {
    Temp_User.findOne({
        email: req.locals.email,
        verified: true
    })
        .select('score')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: 'Cannot Find User' });
            var score = user.score;
            if (score !== undefined) {
                Temp_User.count({ "score": { "$gt": score }, verified: true }, function (err, rank) {
                    if (err) {
                        res.status(400).send({ success: false, msg: 'Rank Undefined', error: err });
                    }
                    return res.json({ success: true, msg: 'Your CA Rank', rank: rank + 1 });
                })
            } else {
                return res.status(400).send({ success: false, msg: 'Error Reading Score' });
            }
        })
};

/* Update Token */
exports.setFBToken = function (req, res) {
    if (req.body && req.body.id && req.body.accessToken) {
        var accessToken = req.body.accessToken;
        var updateData = {
            fb_id: req.body.id,
        }
        if (req.body.image) {
            updateData.image = req.body.image 
        }
        if (req.body.link) {
            updateData.fb_link = req.body.link
        }
        request(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${accessToken}`, function(err, response, body){
            if (err) {
                return res.json({ success: false, msg: 'Graph API Error' });
            }
            var access_token = JSON.parse(response.body).access_token;
            var saveData = Object.assign(updateData, {fb_access_token: access_token});
            Temp_User.update({ email: req.locals.email}, saveData)
                .exec(function (err) {
                    if (err) {
                        return res.json({ success: false, msg: 'Failed to update token', error: err });
                    }
                    return res.json({ success: true, msg: 'Successfully Updated' });
                })
        })
    } else {
        return res.json({ success: false, msg: 'Invalid Data' });
    }
};

/* Check Facebook Token */
exports.checkToken = function (req, res) {
    Temp_User.findOne({ email: req.locals.email, fb_access_token: { $ne: null } })
        .select('fb_access_token')
        .exec(function (err, user) {
            if (err) return res.json({ success: false, msg: 'Unable to find user.' });
            if (!user) return res.json({ success: false, msg: 'Unable to find user.' });
            var fb_auth_token = user.fb_access_token;
            console.log(fb_auth_token,'check token');
            request(`https://graph.facebook.com/v3.1/me?fields=link&access_token=${fb_auth_token}`, function (err, response, body) {
                if (err) return res.json({ success: false, msg: 'Facebook returned error.', error: err });
                if (response.statusCode === 200) {
                    return res.json( { success: true, msg: 'Valid Token'} );
                }
                return res.json({ success: false, msg: 'Failed' });
            })
        });
};

/* GET Profile Data */
exports.getProfile = function (req, res) {
    Temp_User.findOne({
        email: req.locals.email,
    })
        .select('fb_likes fb_shares fb_score bonus ideas referrals score')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: 'Cannot Find User' });
            if (!user) return res.status(400).send({ success: false, msg: 'Cannot Find User' });
            res.json({ success: true, msg: 'Profile Data', body: user });
        })
};

exports.fetch_certificates = function (req, res) {
    if(req.locals && req.locals.email){
        Temp_User.findOne({
            email: req.locals.email
        })
            .select('name thomso_id college verified payment_type')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.', error: err })
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                } else if (!user.verified) {
                    return res.json({ success: true, isVerified: false, msg: 'User Data Found', body: { email: user.email, name: user.name } });
                } else {
                    return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
                }
            });
    }
};
