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
    coordinator_email:{
        type:String
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
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
    blocked: {
        type:Boolean,
        default:false
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('CoCoordinators_User', UserSchema);