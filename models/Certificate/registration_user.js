var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    college: {
        type: String
    },
    address : {
        type: String
    },
    event:{
        type:String
    },
    password:{
        type:String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    image_status:{
        type:String
    },
    payment_status:{
        type:String
    },
    accomodation:{
        type:String
    }
});
module.exports = mongoose.model('registration_user', UserSchema);