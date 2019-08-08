var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    contact: {
        type: String
    },
    college: {
        type: String
    },
    
    email: {
        type: String,
    },
    branch:{
        type:String
    },
    address : {
        type: String
    },
    state : {
        type: String
    },
    why : {
        type: String
    },
    fb_id : {
        type: String
    },
    likes: {
        type: String
    },
    shares : {
        type: String
    },
    score : {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('ca_form', UserSchema);