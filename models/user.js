const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    img: { type: String },
    info: { type: String },
    location: { type: String }
});


var User = mongoose.model('User', schema);


module.exports = User;