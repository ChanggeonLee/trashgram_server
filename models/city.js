const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String },
    score: { type: Number }
});

var city = mongoose.model('city', schema);

module.exports = city;