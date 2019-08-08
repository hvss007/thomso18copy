var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CA_Temp_User'
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    deleted: {
        type: Boolean
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CA_Temp_Idea', UserSchema);