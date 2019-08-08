var request = require('request');
var Temp_User = require('../../../models/ca/CA_Temp_User');

exports.addTopic = function (req, res) {
    if (req && req.body && req.body.token && req.body.topic) {
        var token = req.body.token;
        var topic = req.body.topic;
        var url = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;
        var options = {
            url: url,
            headers: {
              'Authorization': `key=${process.env.FIREBASE_SECRET}`,
              'Content-Type': 'application/json'
            }
        };
        request.post(options, function (err, response, body) {
            if (err) return res.status(400).send({ success: false, msg: 'Firebase returned error.', error: err });
            if (response.statusCode) {
                return res.status(response.statusCode).send(body);
            }
            return res.status(400).send({ success: false, msg: 'Firebase did not return status.' });
        })
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};

exports.addCATopic = function (req, res) {
    if (req && req.body && req.body.token && req.body.topic) {
        var token = req.body.token;
        var topic = req.body.topic;
        var url = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;
        var options = {
            url: url,
            headers: {
              'Authorization': `key=${process.env.FIREBASE_SECRET}`,
              'Content-Type': 'application/json'
            }
        };
        request.post(options, function (err, response, body) {
            if (err) return res.status(400).send({ success: false, msg: 'Firebase returned error.', error: err });
            if (response.statusCode) {
                var updateData = {
                    notification: {
                        token: req.body.token,
                        last_update: new Date()
                    }
                };
                Temp_User.update({ email: req.locals.email }, updateData)
                .exec(function(err) {
                    if (err) {
                        return res.status(400).send({success: false, msg: 'Unable Update Hash'});
                    }
                });
                return res.status(response.statusCode).send(body);
            }
            return res.status(400).send({ success: false, msg: 'Firebase did not return status.' });
        })
    } else {
        return res.status(400).send({ success: false, msg: 'Invalid Params' });
    }
};