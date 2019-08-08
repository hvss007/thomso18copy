var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    thomso_id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thomso_Event'
    }],
    primary_event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thomso_Event'
    },
    verified: {
        type: Boolean,
        default: false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    payment_type:{
        type:Number,
        default:0
    },
    accomodation:{
        type:String,
    },
    image: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    tempPassword:{
        type:String
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    branch: {
        type: String,
        required: true
    },
    referred_by: {
        type: String
    },
    otp: {
        type: String
    },
    mun: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUN_Answer'
    },
    qr:{
        type:String,
        unique:true
    },
    ticktok_username: {
        type: String,
        unique: true
    },
    ticktok_verified: {
        type: Boolean,
        default:true
    },
});

UserSchema.index({name: 'text', email : 'text', thomso_id: 'text', gender: 'text', contact: 'text', college: 'text'});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (pass, callback) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};

UserSchema.methods.compareTempPassword = function (pass, callback) {
    bcrypt.compare(pass, this.tempPassword, function (err, isMatch) {
        console.log(this.tempPassword, pass)
        if (err)
            return callback(err);
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Main_User', UserSchema);
