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
    password: {
        type: String
    },
    ca_id: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    why: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    notification: {
        token: {
            type: String
        },
        last_update: {
            type: Date
        }
    },
    ideas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CA_Temp_Idea'
    }],
    bonus: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    referrals: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    blocked: {
        type: Boolean
    },
    fb_id: {
        type: String
    },
    fb_link: {
        type: String
    },
    fb_access_token: {
        type: String
    },
    fb_likes: {
        type: Number,
        default: 0
    },
    fb_shares: {
        type: Number,
        default: 0
    },
    fb_score: {
        type: Number,
        default: 0
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('CA_Temp_User', UserSchema);