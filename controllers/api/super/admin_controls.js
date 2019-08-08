var bcrypt = require('bcrypt-nodejs');

var Participant = require("../../../models/main/Main_User");
var ParticipantToken = require("../../../models/main/Main_User_Token");
var Coordinators = require("../../../models/coordinators/Coordinators_User");
var Winner_List = require("../../../models/coordinators/Winner_List");
var VipQr = require("../../../models/qr/vip_qr");
var CoordinatorToken = require("../../../models/coordinators/Coordinators_User_Token");

exports.getParticipant = function (req, res) {
    if (req.params.id) {
        Participant.findOne({ _id: req.params.id })
            .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation branch qr')
            .populate('event', 'name')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                }
                res.json({ success: true, msg: 'Participant Data', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.winners = function (req, res) {
    if (req) {
        Winner_List.find({verified:true})
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'Winners not found' });
                }
                res.json({ success: true, msg: 'Winners Data', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.VIP_QR = function (req, res) {
    if (req.body && req.body.qrvalue) {
        // console.log(req.body.qrvalue);
        data = {
            qr:req.body.qrvalue
        }
        if(data && data.qr){
            var newqr = new VipQr(data);
            newqr.save(function(err){
                if(err) return res.status(400).send({success:false, msg:err});
                return res.json({success:true, msg:"Successfully added"});
            })
        }else return res.status(400).send({success:false,msg:"SOmething went wrong"});
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.getPaidParticipant = function (req, res) {
    if (req) {
        // console.log("kajssd");
        Participant.find({payment_type:{$gt:0} })
        .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation branch qr')
        .populate('event', 'name')
        .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                }
                res.json({ success: true, msg: 'Participant Data', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};


exports.getParticipantToken = function (req, res) {
    if (req.params.id) {
        ParticipantToken.findOne({ user_id: req.params.id })
            .select('token')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                }
                if (user && user.token) {
                    return res.json({ success: true, msg: 'Token', token: user.token });
                } else {
                    return res.status(400).send({ success: false, msg: 'Token not found' });
                }
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
}

exports.patchParticipantData = function (req, res) {
    if (req.params.id) {
        if (req.body) {
            var updateData = {};
            if (req.body.thomso_id) {
                updateData.thomso_id = req.body.thomso_id;
            }
            if (req.body.name) {
                updateData.name = req.body.name;
            }
            if (req.body.email) {
                updateData.email = req.body.email;
            }
            if (req.body.gender) {
                updateData.gender = req.body.gender;
            }
            if (req.body.contact) {
                updateData.contact = req.body.contact;
            }
            if (req.body.college) {
                updateData.college = req.body.college;
            }
            if (req.body.state) {
                updateData.state = req.body.state;
            }
            if (req.body.address) {
                updateData.address = req.body.address;
            }
            if (req.body.verified !== undefined) {
                updateData.verified = req.body.verified;
                ParticipantToken.update({ _id: req.params.id }, { verified: req.body.verified }, { multi: true })
                    .exec(function (err) {
                        if (err) {
                            console.log(err)
                        };
                    })
            }
            if (req.body.blocked !== undefined) {
                updateData.blocked = req.body.blocked;
            }
            if (req.body.payment_type !== undefined && !isNaN(parseInt(req.body.payment_type))) {
                updateData.payment_type = parseInt(req.body.payment_type);
            }
            if (req.body.accomodation) {
                updateData.accomodation = req.body.accomodation;
            }
            if (req.body.branch) {
                updateData.branch = req.body.branch;
            }
            if (req.body.qr) {
                updateData.qr = req.body.qr;
            }
            if (req.body.password) {
                updateData.password = req.body.password;
                return bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Failed to generate salt' });
                    }
                    bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Failed to create hash' });
                        }
                        updateData.password = hash;
                        if (updateData) {
                            Participant.findByIdAndUpdate(req.params.id, updateData, { new: true })
                                .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation password branch')
                                .exec(function (err, user) {
                                    if (err) {
                                        return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                                    }
                                    if (!user) {
                                        return res.status(400).send({ success: false, msg: 'User not found' });
                                    }
                                    return res.json({ success: true, msg: 'Updated Data', body: user });
                                });
                        } else {
                            return res.status(400).send({ success: false, msg: 'Empty Data' });
                        }
                    });
                });
            }
            if (updateData && !updateData.password) {
                Participant.findByIdAndUpdate(req.params.id, updateData, { new: true })
                    .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation password branch')
                    .exec(function (err, user) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                        }
                        if (!user) {
                            return res.status(400).send({ success: false, msg: 'User not found' });
                        }
                        return res.json({ success: true, msg: 'Updated Data', body: user });
                    });
            } else {
                return res.status(400).send({ success: false, msg: 'Empty Data' });
            }
        } else {
            return res.status(400).send({ success: false, msg: 'Empty Data' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid User' });
    }
}

exports.getAllCoordinators = function (req, res) {
    Coordinators.find()
        .select('name email gender contact1 contact2 bhawan enrollment_no branch year event_id blocked')
        .exec(function (err, user) {
            if (err) {
                return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
            }
            if (!user) {
                return res.status(400).send({ success: false, msg: 'User not found' });
            }
            res.json({ success: true, msg: 'Participant Data', body: user });
        });
};

exports.getCoordinator = function (req, res) {
    if (req.params.id) {
        Coordinators.findOne({ _id: req.params.id })
            .select('name email gender contact1 contact2 bhawan enrollment_no branch year event_id blocked')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                }
                if (!user) {
                    return res.status(400).send({ success: false, msg: 'User not found' });
                }
                res.json({ success: true, msg: 'Participant Data', body: user });
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.patchCoordinator = function (req, res) {
    if (req.params.id) {
        if (req.body) {
            var updateData = {};
            if (req.body.name) {
                updateData.name = req.body.name;
            }
            if (req.body.email) {
                updateData.email = req.body.email;
            }
            if (req.body.gender) {
                updateData.gender = req.body.gender;
            }
            if (req.body.contact1) {
                updateData.contact1 = req.body.contact1;
            }
            if (req.body.contact2) {
                updateData.contact2 = req.body.contact2;
            }
            if (req.body.bhawan) {
                updateData.bhawan = req.body.bhawan;
            }
            if (req.body.enrollment_no) {
                updateData.enrollment_no = req.body.enrollment_no;
            }
            if (req.body.branch) {
                updateData.branch = req.body.branch;
            }
            if (req.body.year) {
                updateData.year = req.body.year;
            }
            if (req.body.event_id) {
                updateData.event_id = req.body.event_id;
            }
            if (req.body.blocked !== undefined) {
                updateData.blocked = req.body.blocked;
                CoordinatorToken.update({ user_id: req.params.id }, { blocked: req.body.blocked }, { multi: true })
                    .exec(function (err) {
                        if (err) {
                            console.log(err)
                        };
                    })
            }
            if (req.body.password) {
                updateData.password = req.body.password;
                return bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return res.status(400).send({ success: false, msg: 'Failed to generate salt' });
                    }
                    bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Failed to create hash' });
                        }
                        updateData.password = hash;
                        if (updateData) {
                            Coordinators.findByIdAndUpdate(req.params.id, updateData, { new: true })
                                .select('image thomso_id name email gender contact college state address verified blocked payment_type accomodation password branch')
                                .exec(function (err, user) {
                                    if (err) {
                                        return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' });
                                    }
                                    if (!user) {
                                        return res.status(400).send({ success: false, msg: 'User not found' });
                                    }
                                    return res.json({ success: true, msg: 'Updated Data', body: user });
                                });
                        } else {
                            return res.status(400).send({ success: false, msg: 'Empty Data' });
                        }
                    });
                });
            }
            if (updateData && !updateData.password) {
                Coordinators.findByIdAndUpdate(req.params.id, updateData, { new: true })
                    .select('name email gender contact1 contact2 bhawan enrollment_no branch year event_id blocked')
                    .exec(function (err, user) {
                        if (err) {
                            return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                        }
                        if (!user) {
                            return res.status(400).send({ success: false, msg: 'User not found' });
                        }
                        return res.json({ success: true, msg: 'Updated Data', body: user });
                    });
            } else {
                return res.status(400).send({ success: false, msg: 'Empty Data' });
            }
        } else {
            return res.status(400).send({ success: false, msg: 'Empty Data' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid User' });
    }
}

exports.getCoordinatorToken = function (req, res) {
    if (req.params.id) {
        CoordinatorToken.findOne({ user_id: req.params.id })
            .select('token')
            .exec(function (err, user) {
                if (err) {
                    return res.status(400).send({ success: false, msg: 'Unable to connect to database. Please try again.' })
                }
                if (user && user.token) {
                    return res.json({ success: true, msg: 'Token', token: user.token });
                } else {
                    return res.status(400).send({ success: false, msg: 'Token not found' });
                }
            });
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
}
