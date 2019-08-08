var Toppr_Student = require('../../../models/mun/Toppr_Student');

exports.addStudent = function (req, res) {
    if (req && req.body.name && req.body.schoolname && req.body.email && req.body.standard && req.body.mobilenumber && req.body.entry) {
        if (req.body.name) {
            req.body.name = req.body.name.trim();
        }
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
            req.body.email = req.body.email.trim();
        }
        var data = {
            name: req.body.name, 
            schoolname: req.body.schoolname, 
            email: req.body.email, 
            standard: req.body.standard, 
            mobilenumber: req.body.mobilenumber, 
            entry: req.body.entry
        }
        if (data.email && data.name) {
            var student = new Toppr_Student(data);
            student.save(function(err, user) {
                if (err) {
                    return res.json({success: false, msg: 'Email Already Exists'});
                }
                if (!user) {
                    return res.json({success: false, msg: 'Email Already Exists'});
                }
                res.json({success: true, msg: 'Successfully created new user.'});
            });
        } else {
            return res.status(400).send({ success: false, msg: 'Invalid Params' });
        }
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};
