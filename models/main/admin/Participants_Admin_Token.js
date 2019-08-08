var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String
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
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Participants_Admin_Token', UserSchema);