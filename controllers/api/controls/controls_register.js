var moment = require('moment');
var Counter = require('../../../models/counters/Counter');
var Controls_user = require('../../../models/controls/Controls_User');
var Controls_user_token = require('../../../models/controls/Controls_User_Token');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.register = function (req, res) {
    if (req.body && req.body.email && req.body.password) {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        var data = {
            email: req.body.email,
        };
        // console.log(data);
        if (data) {
            var newUser = new Controls_user(data);
            newUser.save(function (err) {
                if (err) {
                    console.log(err)
                    return res.json({ success: false, msg: 'Username already exists.' });
                }
                    var generateHash = Generator.generateHash(req.body.password);
                    generateHash.then(
                        function (newHash) {
                            if (newHash) {
                                var updateData = {
                                    password: newHash
                                };
                                Controls_user.updateOne({ email: req.body.email }, updateData)
                                    .exec(function (err) {
                                        if (err) {
                                            console.log(err,'1')
                                            return res.status(400).send({ success: false, msg: 'Unable Update Hash' });
                                        }
                                        Counter.findByIdAndUpdate({ _id: 'controls_id' }, { $inc: { seq: 1 } }, { upsert: true, new: true }, function (error, cnt) {
                                            if (error) {
                                                return res.status(400).send({ success: false, msg: 'Unable Create ID' });
                                            }
                                            res.json({ success: true, msg: 'Successfully Registered' });
                                        })
                                    });
                            } else {
                                return res.status(400).send({ success: false, msg: 'Promise Failed' });
                            }
                        }
                    )
                        .catch(function (err) {
                            res.status(400).send({ success: false, msg: 'Failed to generate new hash' });
                        })
            });
        } else {
            return res.status(400).send({ success: false, msg: 'Invalid Data' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
};

exports.login = function(req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim()
    }
    // console.log(req.body)
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
    Controls_user.findOne({
        email: req.body.username
    })
    .select('email password')
    .exec(function(err, user) {
        if (err) throw err;

        if (!user) {
            return res.status(400).send({success:false, msg:"Connection failed. User not found."});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    Controls_user.updateOne({email: req.body.username},
                        {
                            updated_date: new Date(),
                            $push: {
                                last_ip: {
                                    $each: [ ip ],
                                    $slice: -5
                                }
                            }
                        }, function(err) {
                            if(err){
                                return res.status(400).send({success:false, msg:'Error Saving IP'});
                            } else {
                                Controls_user_token.find({ email: req.body.username }).sort({'updated_date': 1}).exec(function(err, tokens) {
                                    if (err) {
                                        return res.status(400).send({success: false, msg: 'Unable To find token'});
                                    } else {
                                        var genratedToken = TokenHelper.generateAdminToken(req.body.username);
                                        var newToken = {
                                            email: req.body.username,
                                            user_id: user._id,
                                            token: genratedToken,
                                            expiration_time: moment().day(30),
                                            updated_date: new Date()
                                        };
                                        if (tokens.length > 2 && tokens[0]) {
                                            Controls_user_token.update({ _id: tokens[0]._id }, newToken)
                                                .exec(function(err) {
                                                    if (err) {
                                                        return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                                    }
                                                    res.json({success: true, token: genratedToken, username: req.body.username});
                                                });
                                        } else {
                                            var addToken = new Controls_user_token(newToken);
                                            addToken.save(function(err) {
                                                if (err) {
                                                    return res.status(400).send({success: false, msg: 'Token Already Exists'});
                                                }
                                                res.json({success: true, token: genratedToken, username: req.body.username});
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    );
                } else {
                  return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};