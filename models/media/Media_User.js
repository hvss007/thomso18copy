var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    qr: {
        type: String,
        required: true,
        unique: true,
    },
    organization: {
        type: String
    },
    image: {
        type: String,
    },
    blocked: {
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Media_User',UserSchema);