const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    point: {
        type: Number,
        required: false,
        default: 0,
    },
    grade: {
        type: Number,
        required: false,
        default: 0,
    },
    yetPoint: {
        type: Number,
        required: false,
        default: 0
    },





})

const User = mongoose.model('User', userSchema);

module.exports = User;


// 0=0lv 1=1lv 2=2lv 3=3lv 4=4lv 5=5lv 6=운영자