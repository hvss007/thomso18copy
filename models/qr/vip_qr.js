var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    qr:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.model('vip_qr',UserSchema);
