var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    coordinator_email: {
        type: String,
    },
    thomso_id: {
        type: String,
    },
    name: {
        type: String,
    },
    college: {
        type: String,
    },
    email: {
        type: String,
    },
    contact: {
        type: String,
    },
    event_name: {
        type: String,
    },
    position: {
        type: String,
    },
    event_name_email: {
        type: String,
        unique:true
    },
    ifsc_code: {
        type: String,
    },
    account_no: {
        type: String,
    },
    bank_name: {
        type: String,
    },
    account_holder_name:{
        type:String
    },
    verified:{
        type:Boolean,
        default:true
    },
    created_date:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('Winner_List', UserSchema);