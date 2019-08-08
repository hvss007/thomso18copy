var bcrypt = require('bcrypt-nodejs');

exports.generatePassword = function(length) {
    if(typeof(length) === "number") {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    } else {
        return false
    }
}

exports.generateHash = function(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return reject('Error Generating Salt');
            }
            bcrypt.hash(password, salt, null, function (err, hash) {
                if (err) {
                    return reject('Error Generating Hash');
                }
                return resolve(hash);
            });
        });
    })
}

exports.generateOTP = function(){
    var range = "0123456789", res = "";
    for(var i =0; i<4; i++){
        res += range.charAt(Math.floor(Math.random() * range.length)); 
    }
    return res;
}
