var AssociateSponsor = require('../../../models/beta/Associate_Sponsor');
var mailer = require('../../common/mailer');

exports.addSponsor = function (req, res) {
    if (req.body) {
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.contact) {
            req.body.contact = req.body.contact.trim();
        }
        if (req.body.sponsorType) {
            req.body.sponsorType = req.body.sponsorType.trim();
        }
        if (req.body.message) {
            req.body.message = req.body.message.trim();
        }
        var data = {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            sponsorType: req.body.sponsorType,
            message: req.body.message,
        };
        if (data.name && data.email && data.contact && data.sponsorType) {
            var newSponsor = new AssociateSponsor(data);
            newSponsor.save(function(err, saved) {
                if (err) {
                    return res.json({success: false, msg: 'Email already exists', already: true});
                } else if (!saved) {
                    return res.json({success: false, msg: 'Unable to save'});
                } else {
                    res.json({success: true, msg: 'Successfully Registered'});
                    // if (saved.tz_id && saved.email && saved.name) {
                    //     if (city === 'Lucknow') {
                    //         mailer.zonalsLucknow({
                    //             zn_id: saved.tz_id,
                    //             email: saved.email,
                    //             name: saved.name
                    //         })
                    //     } else if (city === 'Delhi') {
                    //         mailer.zonalsDelhi({
                    //             zn_id: saved.tz_id,
                    //             email: saved.email,
                    //             name: saved.name
                    //         })
                    //     }
                    // }
                }
            })
        } else {
            res.status(400).send({success:false, msg:'Invalid Data'});
        }
    } else {
        res.status(400).send({success:false, msg:'Invalid Data'});
    }
};
