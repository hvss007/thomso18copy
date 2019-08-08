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
    ac_no: {
        type: String,
    },
    thomso_id: {
        type: String
    },
    ifsc: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    position: {
        type: String
    },
    event_name:{
        type:String
    },
    coordi_id:{
        type:String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('winner_list', UserSchema);