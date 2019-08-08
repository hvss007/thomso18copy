var moment = require('moment');

var Main_User_Token = require("../../../models/main/Main_User_Token");

exports.verifyUser = (req, res, next) => {
    var authHeader = req.get('Authorization')
    if (authHeader !== undefined) {
        // Find token in db
        Main_User_Token.findOne({
            token: authHeader
        }, function (err, user) {
            if (err) {
                res.status(403).send({ success: false, msg: 'Token Error' });
            } else if (!user) {
                res.status(403).send({ success: false, msg: 'User Not Found' });
            } else if (moment() > user.expirationTime) {
                res.status(403).send({ success: false, message: 'Token Expired' });
            } else {
                req.locals = {
                    _id: user.user_id,
                    email: user.email
                };
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Token Not Found' })
    }
}

exports.verify = (req, res, next) => {
    var authHeader = req.get('Authorization')
    if (authHeader !== undefined) {
        // Find token in db
        Main_User_Token.findOne({
            token: authHeader,
            verified: true
        }, function (err, user) {
            if (err) {
                res.status(403).send({ success: false, msg: 'Token Error' });
            } else if (!user) {
                res.status(403).send({ success: false, msg: 'Invalid Token' });
            } else if (moment() > user.expirationTime) {
                res.status(403).send({ success: false, message: 'Token Expired' });
            } else {
                req.locals = {
                    _id: user.user_id,
                    email: user.email,
                };
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'Token Not Found' })
    }
}
