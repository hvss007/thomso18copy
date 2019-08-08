var Zonal_User = require('../../../models/zonals/Zonals_Registration');
var mailer = require('../../common/mailer');

var register = function (req, res, city) {
    if (req.body) {
        // console.log(req.body)
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.college) {
            req.body.college = req.body.college.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        if (req.body.branch) {
            req.body.branch = req.body.branch.trim();
        }
        if (req.body.contact) {
            req.body.contact = req.body.contact.trim();
        }
        if (city) {
            city = city.trim();
        }
        var data = {
            name: req.body.name,
            college: req.body.college,
            email: req.body.email,
            branch: req.body.branch,
            contact: req.body.contact,
            events: req.body.events,
            city: city
        };
        if (data.name && data.college && data.email && data.branch && data.contact && data.city && typeof (data.events) === "object" && data.events.length > 0) {
            Zonal_User.findOne({ email: req.body.email }, function (error, exists) {
                if (error) {
                    return res.status(400).send({ success: false, msg: 'Find Check Failed' });
                }
                if (!exists) {
                    var newUser = new Zonal_User(data);
                    newUser.save(function (err, saved) {
                        if (err) {
                            return res.json({ success: false, msg: 'Email already exists', already: true });
                        } else if (!saved) {
                            return res.json({ success: false, msg: 'Unable to save' });
                        } else {
                            res.json({ success: true, msg: 'Successfully Registered' });
                            if (saved.tz_id && saved.email && saved.name) {
                                if (city === 'Lucknow') {
                                    mailer.zonalsLucknow({
                                        zn_id: saved.tz_id,
                                        email: saved.email,
                                        name: saved.name
                                    })
                                } else if (city === 'Delhi') {
                                    mailer.zonalsDelhi({
                                        zn_id: saved.tz_id,
                                        email: saved.email,
                                        name: saved.name
                                    })
                                } else if (city === 'Jaipur') {
                                    mailer.zonalsJaipur({
                                        zn_id: saved.tz_id,
                                        email: saved.email,
                                        name: saved.name
                                    })
                                } else if (city === 'Chandigadh') {
                                    mailer.zonalsChandigadh({
                                        zn_id: saved.tz_id,
                                        email: saved.email,
                                        name: saved.name
                                    })
                                }

                            }
                        }
                    });
                } else {
                    return res.json({ success: false, msg: 'Email already exists', already: true });
                }
            })
        } else {
            res.status(400).send({ success: false, msg: 'Invalid Data' });
        }
    } else {
        res.status(400).send({ success: false, msg: 'Invalid Data' });
    }
};

exports.register_delhi = function (req, res) {
    register(req, res, 'Delhi')
}

exports.register_jaipur = function (req, res) {
    register(req, res, 'Jaipur')
}

exports.register_lucknow = function (req, res) {
    register(req, res, 'Lucknow')
}

exports.register_chandigadh = function (req, res) {
    register(req, res, 'Chandigadh')
}
