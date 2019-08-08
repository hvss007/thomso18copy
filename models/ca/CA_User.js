var mongoose = require('mongoose');

var Counter = require("../counters/Counter");

var UserSchema = new mongoose.Schema({
    fb_id: {
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
        unique: true
    },
    gender: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    ca_id: {
        type: String
    },
    contact: {
        type: String
    },
    college: {
        type: String
    },
    state : {
        type: String
    },
    branch: {
        type: String
    },
    address : {
        type: String
    },
    why: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    referrals: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 0
    },
    link: {
        type: String
    },
    ideas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CA_Idea'
    }],
    created: {
        type: Boolean,
        default: false
    },
    notification: {
        type: String
    },
    blocked: {
        type: Boolean,
        default: false
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'ca_id'}, {$inc: { seq: 1} }, {upsert: true, new: true}, function(error, cnt)   {
        if(error)
            return next(error);
        doc.ca_id = "TH2000" + cnt.seq;
        next();
    })
});

module.exports = mongoose.model('CA_User', UserSchema);