var Main_User = require('../../../models/main/Main_User');
// var CA_User = require('../../../models/ca/CA_Temp_User');
var MUN_Answer = require('../../../models/mun/MUN_Answer');
var EventSchema = require('../../../models/main/Thomso_Event');
var Winner = require('../../../models/coordinators/Winner_List');

var mailer = require('../../common/mailer');

exports.userInfo = function (req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
        .populate('primary_event', 'name')
        .select('name email gender thomso_id college address contact verified primary_event image payment_type')
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
            } else if (!user.verified) {
                return res.json({ success: true, isVerified: false, msg: 'User Data Found', body: { email: user.email, name: user.name } });
            } else {
                return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
            }
        });
};

exports.get_image = function (req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
        .select('verified image')
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
            } else if (!user.verified) {
                return res.json({ success: true, isVerified: false, msg: 'User Data Found', body: { email: user.email, name: user.name } });
            } else {
                return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
            }
        });
};

exports.getUserEvents = function (req, res) {
    Main_User.findOne({
        email: req.locals.email
    })
        .populate('event', 'name event_id')
        .select('primary_event')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            } else {
                res.json({ success: true, msg: 'Events List', body: user });
            }
        });
};

exports.update_image = function (req, res) {
    if (req && req.body && req.body.format) {
        let data = {
            id: req.locals._id,
            email: req.locals.email,
            img: req.body.image,
            format: req.body.format
        }
        let baseImg = data.img.split(',')[1]
        let binaryData = new Buffer(baseImg, 'base64');
        let ext = data.format.split('/')[1]
        let updateData = { image: `${data.id}.${ext}` }
        const url = `/uploads/img/ProfileImage/${updateData.image}`;
        require("fs").writeFile(`./uploads/img/ProfileImage/${updateData.image}`, binaryData, function (err) {
            if (err) {
                return res.status(400).send({ success: false, msg: "something went wrong" });
            } else {
                Main_User.findOneAndUpdate({
                    email: data.email
                }, updateData)
                    .exec(function (err) {
                        if (err) return res.status(400).send({ success: false, msg: "Unable To Upload Image. Please Try Again." });
                        res.json({ success: true, body: url, msg: "Image Uploaded Successfully." });
                    })
            }
        })
    } else res.status(400).send({ success: false, msg: 'Invalid Data' });
}

exports.resendOTP = function (req, res) {
    if (req.locals.email) {
        Main_User.findOne({
            email: req.locals.email
        })
            .select('name email otp')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                } else {
                    mailer.participantRegister({
                        name: user.name,
                        email: user.email,
                        otp: user.otp
                    });
                    res.json({ success: true, msg: 'Successfully sent email', body: user.email });
                }
            });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }
};


exports.ticktok_username = function (req, res) {
    if (req.locals.email && req.body.username) {
        req.body.username = req.body.username.trim()

        let data = {
            ticktok_username: req.body.username
        }
        Main_User.findOneAndUpdate({
            email: req.locals.email
        }, data)
        .select('name')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                res.json({ success: true,body:user, msg: "Updated" })
            });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }
};

exports.fetch_certificates_participant = function (req, res) {
    if(req.locals && req.locals.email){
        Main_User.findOne({
            email: req.locals.email
        })
        .select('name thomso_id college verified payment_type ticktok_username ticktok_verified')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.', error: err })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            }
                return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
        });
    }
};

exports.fetch_certificates_winner = function (req, res) {
    if(req.locals && req.locals.email){
        Winner.find({
            email: req.locals.email
        })
        .select('event_name position')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.', error: err })
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            }
                return res.json({ success: true, isVerified: true, msg: 'User Data Found', body: user });
        });
    }
};

exports.certificate_verifications_participant = function(req, res){
    if ( req.body && req.body.thomso_id) {
        req.body.thomso_id = req.body.thomso_id.trim()
        Main_User.findOne({thomso_id: req.body.thomso_id})
        .select('thomso_id name college payment_type')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                res.json({ success: true,body:user, msg: "Fetched" })
            });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }   
}

exports.certificate_verifications_winner = function(req, res){
    if ( req.body && req.body.thomso_id) {
        req.body.thomso_id = req.body.thomso_id.trim()
        Winner.find({thomso_id: req.body.thomso_id})
        .select('thomso_id name college position event_name')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                res.json({ success: true,body:user, msg: "Fetched" })
            });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }   
}

exports.munAnswer = function (req, res) {
    if (req.locals._id && req.locals.email && req.body.answerOne && req.body.answerTwo && req.body.answerThree) {
        var data = {
            answerOne: req.body.answerOne,
            answerTwo: req.body.answerTwo,
            answerThree: req.body.answerThree,
            user: req.locals._id,
            email: req.locals.email
        }
        MUN_Answer.findOneAndUpdate({ email: req.locals.email }, data, { upsert: true, new: true })
            .exec(function (err, answer) {
                if (err) {
                    return res.json({ success: false, msg: 'Error' });
                } else if (!answer) {
                    return res.json({ success: false, msg: 'Unable to save' });
                } else {
                    Main_User.findOneAndUpdate({
                        _id: req.locals._id
                    }, {
                            mun: answer._id,
                            $addToSet: { event: "5b8456af1715f612ef4192c4" }
                        }).exec(function (err, ans) {
                            if (err) return res.json({ success: false, msg: "Unable to add answer" });
                            if (!ans) return res.json({ success: false, msg: "Unable to add answer, user not found" });
                            EventSchema.findOneAndUpdate(
                                { _id: "5b8456af1715f612ef4192c4" },
                                { $addToSet: { users: req.locals._id } }
                            )
                                .exec(function (err, result) {
                                    if (err) {
                                        return res.json({ success: false, msg: 'Unable to add participant' });
                                    }
                                    if (result) {
                                        return res.json({ success: true, msg: 'Event added in participant' });
                                    } else {
                                        return res.json({ success: false, msg: 'No such event Exists' });
                                    }
                                });
                        })
                }
            });
    } else {
        res.status(400).send({ success: false, msg: 'User Not Found' });
    }
};
