var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
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
    blocked:{
        type:Boolean,
        default:false
    },
    updated_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Coordinators_User_Token', UserSchema);