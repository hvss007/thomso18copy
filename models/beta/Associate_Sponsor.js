var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sponsorType: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Associate_Sponsor', UserSchema);