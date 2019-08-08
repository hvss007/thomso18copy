crypto = require('crypto');
moment = require('moment');

// Generate token
exports.generateUserToken = function (id, email) { 
    return crypto.createHash('sha256').update(id + email + moment().unix()).digest('base64').toString();
}

exports.generateAdminToken = function (username) {
    return crypto.createHash('sha256').update(username + moment().unix()).digest('base64').toString();
}
