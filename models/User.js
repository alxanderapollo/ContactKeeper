const mongoose = require('mongoose');
//models of what we exacpt the JSON objects to look like
//be will be used in our user routes files
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('user', UserSchema)