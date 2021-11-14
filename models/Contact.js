const mongoose = require('mongoose');
//models of what we exacpt the JSON objects to look like
//be will be used in our user routes files
const ContactSchema = mongoose.Schema({
    //user refers to users
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    type:{
        type:String,
        default:'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('contact', ContactSchema)