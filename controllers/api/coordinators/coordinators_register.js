var moment = require('moment');
var Coordinators_User = require('../../../models/coordinators/Coordinators_User');
var Coordinators_User_Token = require('../../../models/coordinators/Coordinators_User_Token');
// var Temp_User = require('../../../models/ca/CA_Temp_User');
var Counter = require('../../../models/counters/Counter');
// var EventSchema = require('../../../models/main/Thomso_Event');
var TokenHelper = require('../../../helpers/TokenHelper');
var Generator = require("../../../helpers/GeneratePassword");

exports.register = function (req, res) {
    if (req.body) {
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.contact1) {
            req.body.contact1 = req.body.contact1.trim();
        }
        if (req.body.contact2) {
            req.body.contact2 = req.body.contact2.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.gender) {
            req.body.gender = req.body.gender.trim();
        }
        if (req.body.bhawan) {
            req.body.bhawan = req.body.bhawan.trim();
        }
        if (req.body.year) {
            req.body.year = req.body.year.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.enrollment_no) {
            req.body.enrollment_no = req.body.enrollment_no.trim();
        }
        if (req.body.event_id) {
            req.body.event_id = req.body.event_id.trim();
        }
        var data = {
            name: req.body.name,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            email: req.body.email,
            gender: req.body.gender,
            bhawan: req.body.bhawan,
            year: req.body.year,
            branch: req.body.branch,
            enrollment_no: req.body.enrollment_no,
            event_id: req.body.event_id,
            password:req.body.password
        };
        if (data.name && data.contact1 && data.contact2 && data.email && data.gender && data.bhawan && data.year && data.branch && data.enrollment_no && data.event_id) {
            var newUser = new Coordinators_User(data);
            newUser.save(function (err) {
                if (err) {
                    return res.json({ success: false, msg: 'Username already exists.' });
                }
                Counter.findByIdAndUpdate({ _id: 'coordinators_id' }, { $inc: { seq: 1 } }, { upsert: true, new: true }, function (error, cnt) {
                    if (error) {
                        return res.status(400).send({ success: false, msg: 'Unable Create ID' });
                    }
                    res.json({ success: true, msg: 'Successfully Registered' });
                })                     
            });
        } else {
            res.status(400).send({ success: false, msg: 'Invalid Data' });
        }
    } else {
        res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
};

exports.login = function(req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim()
    }
    console.log(req.body)
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
    Coordinators_User.findOne({
        email: req.body.username
    })
    .select('email password')
    .exec(function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    Coordinators_User.updateOne({email: req.body.username},
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
                                Coordinators_User_Token.find({ email: req.body.username }).sort({'updated_date': 1}).exec(function(err, tokens) {
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
                                            Coordinators_User_Token.update({ _id: tokens[0]._id }, newToken)
                                                .exec(function(err) {
                                                    if (err) {
                                                        return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                                    }
                                                    res.json({success: true, token: genratedToken, username: req.body.username});
                                                });
                                        } else {
                                            var addToken = new Coordinators_User_Token(newToken);
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
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};