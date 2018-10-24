const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    author: {tyep:Schema.Types.ObjectId, ref: 'User'},
    img: {type: String, required: true , trim: true},
    location: {type: String, required: true},
    hashtag: [String],
    day: {type:String},
})

var Post = mongoose.model('Post', schema);

module.exports = Post;