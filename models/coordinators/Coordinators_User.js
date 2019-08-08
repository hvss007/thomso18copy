var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact1: {
        type: String,
        required: true
    },
    contact2: {
        type: String,
        required: true
    },
    bhawan: {
        type: String,
        required: true
    },
    enrollment_no: {
        type: String,
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    event_id: {
        type:String,
    },
    password: {
        type: String,
    },
    blocked: {
        type:Boolean,
        default:false
    },
    created_date:{
        type:Date,
        default:Date.now
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

UserSchema.methods.comparePassword = function (pass, callback) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Coordinators_User', UserSchema);