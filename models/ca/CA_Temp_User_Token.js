var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    verified: {
        type: Boolean
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

module.exports = mongoose.model('CA_Temp_Users_Token', UserSchema);