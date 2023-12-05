const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postCommentSchema = new Schema({
    body: {
        type: String,
        default: ''
    },
    //작성자
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const PostComment = mongoose.model('PostComment', postCommentSchema);

module.exports = PostComment;


// type 0=일반, 1=공지, 2=이벤트