var mongoose = require('mongoose');

var Counter = require("../counters/Counter");

var UserSchema = new mongoose.Schema({
    tz_id: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    events:{
        type:Array,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({_id: 'zonal_id'}, {$inc: { seq: 1} }, {upsert: true, new: true}, function(error, cnt)   {
        if(error)
            return next(error);
        doc.tz_id = "TZ-" + (180000 + cnt.seq);
        next();
    })
});

module.exports = mongoose.model('zonals_registration', UserSchema);
