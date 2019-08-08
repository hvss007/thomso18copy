var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    last_ip: {
        type: Array,
        default: []
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            console.log(err, isMatch)
            return cb(err);

        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Controls_User', UserSchema);
