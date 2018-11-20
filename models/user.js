const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true , trim: true},
    facebook: {id:String, photo:String, email:String},
    score: {type:Number},
})

var User = mongoose.model('User', schema);

module.exports = User;



