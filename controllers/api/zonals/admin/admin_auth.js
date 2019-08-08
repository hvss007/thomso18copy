var moment = require('moment');

var User = require("../../../../models/zonals/Zonals_Admin");
var Zonals_Admin_Token = require("../../../../models/zonals/Zonals_Admin_Token");
var TokenHelper = require("../../../../helpers/TokenHelper");

// exports.register = function(req, res) {
//     if (req.body.username) {
//         req.body.username = req.body.username.toLowerCase();
//         req.body.username = req.body.username.trim()
//     }
//     if (!req.body.username || !req.body.password) {
//         res.json({success: false, msg: 'Please pass username and password.'});
//     } else {
//         var newUser = new User({
//             username: req.body.username,
//             password: req.body.password
//         });
//         newUser.save(function(err) {
//             if (err) {
//                 return res.json({success: false, msg: 'Username already exists.'});
//             }
//             res.json({success: true, msg: 'Successfully created new user.'});
//         });
//     }
// };

exports.login = function(req, res) {
    if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
        req.body.username = req.body.username.trim()
    }
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];
    User.findOne({
        username: req.body.username
    })
    .select('username password')
    .exec(function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    User.updateOne({username: req.body.username},
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
                            }  else {
                                Zonals_Admin_Token.find({ username: req.body.username }).sort({'updated_date': 1}).exec(function(err, tokens) {
                                    if (err) {
                                        return res.status(400).send({success: false, msg: 'Unable To find token'});
                                    } else {
                                        var genratedToken = TokenHelper.generateAdminToken(req.body.username);
                                        var newToken = {
                                            username: req.body.username,
                                            user_id: user._id,
                                            token: genratedToken,
                                            expiration_time: moment().day(30),
                                            updated_date: new Date()
                                        };
                                        if (tokens.length > 2 && tokens[0]) {
                                            Zonals_Admin_Token.update({ _id: tokens[0]._id }, newToken)
                                                .exec(function(err) {
                                                    if (err) {
                                                        return res.status(400).send({success: false, msg: 'Unable Create Token'});
                                                    }
                                                    res.json({success: true, token: genratedToken, username: req.body.username});
                                                });
                                        } else {
                                            var addToken = new Zonals_Admin_Token(newToken);
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
