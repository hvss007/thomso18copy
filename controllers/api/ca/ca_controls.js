var request = require('request');

var Users = require('../../../models/ca/CA_User');
var Ideas = require('../../../models/ca/CA_Idea');

/* GET all Posts */
exports.getPosts = function (req, res) {
    Users.findOne({
        fb_id: req.locals.fb_id
    })
        .select('access_token')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: 'Database Returned error' });;
            var fb_auth_token = user.access_token;
            //171774543014513
            request(`https://graph.facebook.com/v3.1/171774543014513?fields=posts.limit(100){created_time,id,full_picture,message,link}&access_token=${fb_auth_token}`, function (err, response, body) {
                if (err) return res.status(400).send({ success: false, msg: 'Facebook returned error.', error: err });
                if (response.statusCode) {
                    return res.status(response.statusCode).send(body);
                }
                return res.status(400).send({ success: false, msg: 'Facebook didnt return status.' });
            })
        });
};

exports.getUserPosts = function (req, res) {
    Users.findOne({
        fb_id: req.locals.fb_id
    })
        .select('access_token')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: 'Unable to find user.' });
            var fb_auth_token = user.access_token;
            request(`https://graph.facebook.com/v3.1/me?fields=posts.limit(100){created_time,id,full_picture,message,link,likes.limit(0).summary(true)}&access_token=${fb_auth_token}`, function (err, response, body) {
                if (err) return res.status(400).send({ success: false, msg: 'Facebook returned error.', error: err });
                if (response.statusCode) {
                    return res.status(response.statusCode).send(body);
                }
                return res.status(400).send({ success: false, msg: 'Facebook didnt return status.' });
            })
        });
};

/* Create Idea */
exports.postIdea = function (req, res) {
    if (req.body && req.body.title && req.body.body && req.locals._id) {
        var newData = {
            user: req.locals._id,
            fb_id: req.locals.fb_id,
            title: req.body.title,
            body: req.body.body
        }
        var newIdea = new Ideas(newData);
        newIdea.save(function (err, idea) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to Add Idea' });
            } else if (idea._id) {
                Users.update({ _id: req.locals._id }, { $addToSet: {ideas: idea._id} })
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
    Ideas.find({ fb_id: req.locals.fb_id, deleted: { $ne: true } })
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
            Ideas.findOneAndUpdate({ fb_id: req.locals.fb_id, _id: req.params.id }, updateData, { new: true })
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
        Ideas.update({ fb_id: req.locals.fb_id, _id: req.params.id }, updateData)
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
    Users.find({ blocked: { $ne: true } })
        .select('name likes college score referrals shares')
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
    Users.findOne({
        fb_id: req.locals.fb_id,
        blocked: { $ne: true }
    })
        .select('score')
        .exec(function (err, user) {
            if (err) return res.status(400).send({ success: false, msg: 'Cannot Find User' });
            var score = user.score;
            if (score !== undefined) {
                Users.count({ "score": { "$gt": score } }, function (err, rank) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Rank Undefined', error: err });
                    }
                    return res.json({ success: true, msg: 'Your CA Rank', rank: rank + 1 });
                })
            } else {
                return res.status(400).send({ success: false, msg: 'Error Reading Score' });
            }
        });
};
