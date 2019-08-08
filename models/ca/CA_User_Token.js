var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fb_id: {
        type: String,
        unique: true,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    expiration_time: {
        type: Date,
        required: true
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CA_User_Token', UserSchema);