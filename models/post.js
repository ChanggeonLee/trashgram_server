const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    // author: {tyep:Schema.Types.ObjectId, ref: 'User'},
    img: {type: String, required: true , trim: true},
    hashtag: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now}
})

var Post = mongoose.model('Post', schema);

module.exports = Post;



