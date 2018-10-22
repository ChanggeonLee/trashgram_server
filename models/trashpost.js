const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var schema = new Schema({
    img: { type:String },
    location: { type:String },
    hastag: [], // [string] 
    day: { type:String },
    //auth: user.id
});

var trashpost = mongoose.model('trashpost', schema);

module.exports = trashpost;

