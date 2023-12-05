const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        default: ''
    },
    //작성자
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComment'
    }],
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: Array,
        default: []
    },



})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


// type 0=일반, 1=공지, 2=이벤트