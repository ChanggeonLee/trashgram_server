const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
   name:{type:String},
   score:{type:Number},
})

var City = mongoose.model('City', schema);

module.exports = City;