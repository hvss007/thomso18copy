var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('ca_certi', UserSchema);