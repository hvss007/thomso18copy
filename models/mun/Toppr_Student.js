var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    schoolname:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    standard: {
        type:String,
        required:true
    },
    mobilenumber: {
        type:String,
        required:true
    },
    entry: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Toppr_Student',UserSchema);
