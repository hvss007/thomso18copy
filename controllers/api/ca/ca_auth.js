var request = require('request');
var moment = require('moment');

var mailer = require('../../common/mailer');
var CA_User = require("../../../models/ca/CA_User");
var CA_User_Token = require("../../../models/ca/CA_User_Token");
var TokenHelper = require("../../../helpers/TokenHelper");
var client_id = process.env.REACT_APP_FB_ID;
var client_secret = process.env.FACEBOOK_APP_SECRET;

// Login using Facebook
exports.fblogin = function(req, res) {
    var accessToken = req.body.accessToken;
    var data = {
        fb_id: req.body.id,
        name: req.body.name,
        link: req.body.link,
        image: req.body.image
    };
    request(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${accessToken}`, function(err, response, body){
        var access_token = JSON.parse(response.body).access_token;
        var saveData = Object.assign(data, {access_token: access_token})
        CA_User.findOne({
            fb_id: req.body.id
        })
        .select('name gender image fb_id email ca_id likes shares referrals score notification blocked link created college')
        .exec(function(err, user) {
            if (err) {
                return res.status(400).send({
                    success:false,
                    msg: 'Unable to connect to database. Please try again.',
                    error: err
                })
            }
            if (!user) {
                // Return Data
                if (req.body.email) {
                    saveData = Object.assign(saveData, {email: req.body.email});
                }
                var newUser = new CA_User(saveData);
                newUser.save(function(err, user) {
                    if (err) {
                        return res.status(400).send({success: false, emailerr: true, msg: 'Unable to Add User'});
                    }
                    var newToken = {
                        fb_id: req.body.id,
                        user_id: newUser._id,
                        token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                        expirationTime: moment().day(30),
                        updated_date: new Date()
                    };
                    CA_User_Token.findOneAndUpdate({ fb_id: req.body.id }, newToken, { upsert: true, new:true })
                    .exec(function(err, token) {
                        if (err) {
                            return res.status(400).send({success: false, msg: 'Unable Create Token'});
                        }
                        res.json({success: true, msg: 'New User, Created False', token: token.token, new: true, body: {
                            email: user.email,
                            name: user.name,
                            fb_id: user.fb_id
                        }});
                    });
                });
            } else {
                // Update User
                if (user.created) {
                    CA_User.findOneAndUpdate({fb_id: req.body.id}, saveData, { new:true })
                    .select('name gender image ca_id likes shares referrals score notification blocked link created college')
                    .exec(function(err, user) {
                        if(err){
                            return res.status(400).send({success:false, msg:'Error Updating User', error:err});
                        }
                        var newToken = {
                            fb_id: req.body.id,
                            user_id: user._id,
                            token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                            expirationTime: moment().day(30),
                            updated_date: new Date(),
                        };
                        CA_User_Token.findOneAndUpdate({ fb_id: req.body.id }, newToken, { upsert: true, new:true })
                        .exec(function(err, token) {
                            if (err) {
                                return res.status(400).send({success: false, msg: 'Unable Create Token'});
                            }
                            res.json({success: true, msg:'User Successfully Updated', token: token.token, new: true, body:user});
                        });
                    })
                } else {
                    var newToken = {
                        fb_id: req.body.id,
                        user_id: user._id,
                        token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                        expirationTime: moment().day(30),
                        updated_date: new Date(),
                    };
                    CA_User_Token.findOneAndUpdate({ fb_id: req.body.id }, newToken, { upsert: true, new:true })
                    .exec(function(err, token) {
                        if (err) {
                            return res.status(400).send({success: false, msg: 'Unable Create Token'});
                        }
                        res.json({success: true, msg: 'New User, Creating...', token: token.token, new: true, body:user});
                    });
                }
            }
        });
    })
};

// Register Using Facebook
exports.fbRegister = function(req, res) {
    if (req.body) {
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.contact) {
            req.body.contact = req.body.contact.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.trim();
            req.body.email = req.body.email.toLowerCase();
        }
        if (req.body.gender) {
            req.body.gender = req.body.gender.trim();
        }
        if (req.body.college) {
            req.body.college = req.body.college.trim();
        }
        if (req.body.state) {
            req.body.state = req.body.state.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.address) {
            req.body.address = req.body.address.trim();
        }
        if (req.body.why) {
            req.body.why = req.body.why.trim();
        }
        var data = {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            gender: req.body.gender,
            college: req.body.college,
            state: req.body.state,
            branch: req.body.branch,
            address: req.body.address,
            why: req.body.why,
            created: true,
            updated_date: new Date()
        }
        if (data.name && data.contact && data.email && data.gender && data.college && data.state && data.branch && data.address && data.why) {
            CA_User.findOneAndUpdate({fb_id: req.locals.fb_id}, data, { new:true })
            .select('name gender image email ca_id likes shares referrals score notification blocked link college')
            .exec(function(err, user) {
                if(err){
                    return res.status(400).send({success:false, msg:'Error Creating User', emailerr: true, error:err});
                }
                if (user) {
                    var newToken = {
                        fb_id: req.locals.fb_id,
                        user_id: user._id,
                        token: TokenHelper.generateUserToken(req.body.id, req.body.email),
                        expirationTime: moment().day(30),
                        updated_date: new Date()
                    };
                    CA_User_Token.findOneAndUpdate({ fb_id: req.locals.fb_id }, newToken, { upsert: true, new:true })
                        .exec(function(err, token) {
                            if (err) {
                                return res.status(400).send({success: false, msg: 'Unable Create Token'});
                            }
                            res.json({success: true, msg: 'User Created', token: token.token, new: true, body:user});
                        });
                    if(user.email) {
                        mailer.caMailer(user.email);
                    }
                } else {
                    return res.status(400).send({success:false, msg:'Unable to find user'});
                }
            })
        } else {
            res.status(400).send({success:false, msg:'Invalid Data'});
        }
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};

// Get User Data
exports.getData = function(req, res) {
    console.log(req.locals.fb_id);
    CA_User.findOne({
        fb_id: req.locals.fb_id
    })
    .select('name gender image fb_id email ca_id likes shares referrals score notification blocked link college created')
    .exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                success:false,
                msg: 'Unable to connect to database. Please try again.',
                error: err
            })
        }
        if (!user || user.created === false) {
            return res.status(400).send({success: false, msg: 'User not found'});
        } else {
            if (user.created) {
                res.json({success: true, msg:'User Data Found', body:user});
            } else {
                res.json({success: true, msg:'User Not Created'});
            }
        }
    });
};