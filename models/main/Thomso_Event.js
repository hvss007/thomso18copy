var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    event_id:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    isPrimary: {
        type:Boolean,
        default: false
    },
    users : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Main_User'    
    }]
});

module.exports = mongoose.model('Thomso_Event',UserSchema);