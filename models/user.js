const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true , trim: true},
    info: {type:String},
    location: {type:String},
    facebook: {id:String, token: String, photo:String}
})

var User = mongoose.model('User', schema);

module.exports = User;