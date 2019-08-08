var moment = require('moment');

var Coordinators_User_Token = require("../../models/coordinators/Coordinators_User_Token");

exports.verifyUser = (req, res, next) => {
    var authHeader = req.get('Authorization')
    if (authHeader !== undefined) {
        // Find token in db
        Coordinators_User_Token.findOne({
            token: authHeader,
            blocked: { $ne: true }
        }, function(err, user) {
            if (err) {
                res.status(403).send({success: false, msg: 'Token Error'});
            } else if (!user) {
                res.status(403).send({success: false, msg: 'User Not Found'});
            } else if (moment() > user.expirationTime) {
                res.status(403).send({ success: false, message: 'Token Expired' });
            } else {
                req.locals = {
                    _id: user._id,
                    email: user.email
                };
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Token Not Found' })
    }
}
