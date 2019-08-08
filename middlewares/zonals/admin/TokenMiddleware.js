var moment = require('moment');

var Zonals_Admin_Token = require("../../../models/zonals/Zonals_Admin_Token");

exports.verify = (req, res, next) => {
    var authHeader = req.get('Authorization')
    if (authHeader !== undefined) {
        // Find token in db
        Zonals_Admin_Token.findOne({
            token: authHeader
        }, function(err, user) {
            if (err) {
                res.status(403).send({success: false, msg: 'Token Error'});
            };
            if (!user) {
                res.status(403).send({success: false, msg: 'Invalid Token'});
            } else if (moment() > user.expirationTime) {
                // If token expired
                res.status(403).send({ success: false, message: 'Token Expired' });
            } else {
                req.locals = {
                    _id: user.user_id,
                    username: user.username
                };
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Token Not Found' })
    }
}
