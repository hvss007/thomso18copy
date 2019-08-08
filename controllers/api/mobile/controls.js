var Media_User = require("../../../models/media/Media_User");
var Main_User = require('../../../models/main/Main_User');
var VipQR = require('../../../models/qr/vip_qr');

exports.scanMediaQR = function(req, res) {
    if (req.body) {
        console.log(req.body);
        var updateData = {};
        if (req.body.name) {
            updateData.name = req.body.name;
        }
        if (req.body.email) {
            updateData.email = req.body.email.toLowerCase();
            updateData.email = updateData.email.trim();
        }
        if (req.body.contact) {
            updateData.contact = req.body.contact;
        }
        if (req.body.organization) {
            updateData.organization = req.body.organization;
        }
        if (req.body.qr) {
            updateData.qr = req.body.qr;
            updateData.qr = updateData.qr.trim();
        }
        var data = {
            img:req.body.image,
            format:req.body.format
        }
        if (updateData) {
            console.log(updateData)
            Media_User.findOne({qr: updateData.qr})
                .select('name email')
                .exec(function(err, user) {
                    if (err) {
                        return res.json({
                            success:false,
                            msg: 'Unable to connect to database. Please try again.',
                            error: err
                        });
                    }
                    if (!user) {
                        console.log(data)
                        var baseImg = data.img;
                        var binaryData = new Buffer(baseImg, 'base64');
                        var ext = data.format.split('/')[1];
                        updateData.image = `${updateData.qr}.${ext}`;
                        require("fs").writeFile(`./uploads/img/MediaImage/${updateData.image}`, binaryData, function(err) {
                            if(err) {
                                return res.json({ success: false, msg:"Image could not be saved", error: err});
                            } else {
                                var newUser = new Media_User(updateData);
                                newUser.save(function(err) {
                                    if (err) {
                                        return res.json({success: false, msg: 'Media Cannot Be Saved.', error: err});
                                    }
                                    return res.json({success: true, msg: 'Successfully Created New Media.'});
                                });
                            }
                        });
                    } else {
                        return res.json({success: false, msg: 'QR Already Exists', body: user});
                    }
                });
        } else {
            return res.json({success: false, msg: 'Invalid Data'});
        }
    } else {
        return res.json({success: false, msg: 'Invalid Data'});
    }
};

exports.getParticipant = function (req, res) {
    if (req.params.id) {
        Main_User.findOne({ thomso_id: req.params.id })
            .select('thomso_id name email college image')
            .exec(function (err, user) {
                if (err) {
                    return res.json({ success: false, msg: 'Something Went Wrong', error: err })
                }
                if (!user) {
                    return res.json({ success: false, msg: 'User not found' });
                }
                return res.json({ success: true, msg: 'User Found', body: user });
            });
    } else {
        return res.json({ success: false, msg: 'Invalid Params' });
    }
}

exports.scanParticipantQR = function(req, res) {
    if (req.body && req.body.thomso_id && req.body.qr) {
        var updateData = {};

        updateData.qr = req.body.qr;
        updateData.qr = updateData.qr.trim();

        req.body.thomso_id = req.body.thomso_id.trim();
        req.body.thomso_id = req.body.thomso_id.toUpperCase();

        Main_User.findOne({
            thomso_id:req.body.thomso_id
        })
            .select('verified blocked payment_type')
            .exec(function(err, user) {
                if (err) {
                    return res.json({ success: false, msg: "Something Went Wrong", error: err });
                }
                if (user) {
                    if (!user.verified) {
                        return res.json({ success: false, msg: "User Not Verified" });
                    }
                    if (user.blocked) {
                        return res.json({ success: false, msg: "Your Account Seems Suspecious" });
                    }
                    if (!user.payment_type) {
                        return res.json({ success: false, msg: "Payment Not Verified" });
                    }
                    if (req.body.image && req.body.format) {
                        var data = {
                            id:user._id,
                            img:req.body.image,
                            format:req.body.format
                        };
                        var baseImg = data.img;
                        var binaryData = new Buffer(baseImg, 'base64');
                        var ext = data.format.split('/')[1];
                        updateData.image = `${data.id}.${ext}`;
                        require("fs").writeFile(`./uploads/img/ProfileImage/${updateData.image}`, binaryData, function(err) {
                            if(err) {
                                return res.json({ success: false, msg:"Image could not be saved", error: err});
                            } else {
                                Main_User.update({
                                    thomso_id: req.body.thomso_id
                                }, updateData)
                                    .exec(function(err){
                                        if (err) {
                                            return res.json({ success: false, msg: "Failed to update data", error: err});
                                        }
                                        return res.json({ success: true, msg: "QR, Image Updated" });
                                    })
                            }
                        })
                    } else {
                        Main_User.update({
                            thomso_id: req.body.thomso_id
                        }, updateData)
                            .exec(function(err){
                                if (err) {
                                    return res.json({ success: false, msg: "Failed to update data" });
                                }
                                return res.json({ success: true, msg: "QR Updated, No Image" });
                            })
                    }
                } else {
                    return res.json({ success: false, msg: "User Not Found" });
                }
            });
    } else {
        return res.json({success: false, msg: 'Invalid Data'});
    }
};

exports.getPronite = function(req, res) {
    res.json({
        status: 200,
        success: true,
        data: [
            // {
            //     day: 'Day 0 ',
            //     date: '25-10-2018',
            //     name: 'Coming Soon',
            //     artist: 'Coming Soon',
            //     description: 'Coming Soon',
            //     venue: 'Coming Soon',
            //     image: 'https://www.thomso.in/uploads/img/Pronite/coming_soon.jpeg',
            //     time: 'Coming Soon'
            // },
            {
                day: 'Day 1 ',
                date: '26-10-2018',
                name: 'Pronite',
                artist: 'The Local Train',
                description: 'Coming Soon',
                venue: 'LBS Ground',
                image: 'https://www.thomso.in/uploads/img/Pronite/localtrain.jpeg',
                time: 'Coming Soon'
            },
            {
                day: 'Day 2 ',
                date: '27-10-2018',
                name: 'Xhileration',
                artist: 'Amit Trivedi',
                description: 'Coming Soon',
                venue: 'LBS Ground',
                image: 'https://www.thomso.in/uploads/img/Pronite/amit.jpeg',
                time: 'Coming Soon'
            },
            {
                day: 'Day 3 ',
                date: '28-10-2018',
                name: 'Wargasm',
                artist: 'WolfPack',
                description: 'Coming Soon',
                venue: 'LBS Ground',
                image: 'https://www.thomso.in/uploads/img/Pronite/wolfpack.jpeg',
                time: 'Coming Soon'
            },
        ]
    })
}

exports.getParticipantByQR = function(req, res) {
    if (req.params.id && req.params.id.trim()) {
        req.params.id = req.params.id.trim();
        Main_User.findOne({ qr: req.params.id, verified: true })
            .select('thomso_id name email college contact image blocked payment_type')
            .exec(function (err, user) {
                if (err) {
                    return res.json({ success: false, msg: 'Something Went Wrong', error: err })
                }
                if (!user) {
                    return res.json({ success: false, msg: 'User not found' });
                }
                if (user.blocked) {
                    return res.json({ success: false, msg: 'Unauthorized User' });
                }
                if (!user.payment_type) {
                    return res.json({ success: false, msg: 'Payment Not Verified' });
                }
                return res.json({ success: true, msg: 'User Found', body: user });
            });
    } else {
        return res.json({ success: false, msg: 'Empty QR' });
    }
};

exports.getMediaByQR = function(req, res) {
    if (req.params.id && req.params.id.trim()) {
        req.params.id = req.params.id.trim();
        var user2 = {
            name: "media", email:"media", contact:"media", organization:"media",image:"media"
        }
        Media_User.findOne({ qr: req.params.id })
            .select('name email contact organization image blocked')
            .exec(function (err, user) {
                if (err) {
                    return res.json({ success: false, msg: 'Something Went Wrong', error: err });
                }
                if (!user) {
                    VipQR.findOne({qr:req.params.id})
                        .select('qr')
                        .exec(function(err, result){
                            if(err) return res.json({success:false,msg:"Something went wrong"});
                            if(!result) return res.json({success:false, msg:"No QR"});
                            return res.json({success:true, msg:"Media found", body:user2});
                        })
                }
                else if (user.blocked) {
                    return res.json({ success: false, msg: 'Unauthorized User' });
                }
                return res.json({ success: true, msg: 'User Found', body: user });
            });
    } else {
        return res.json({ success: false, msg: 'Empty QR' });
    }
};
