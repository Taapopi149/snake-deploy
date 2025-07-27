const mongoose = require('mongoose')

const {Schema, model} = mongoose

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    }
})

const User = model('User', userSchema);
module.exports = User;