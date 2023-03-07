const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const user = new Schema({

    username: {
        type: String,
        required:true,
        unique:true,

    },

    Firstname: {
        type: String,
        required: true,

    },
    Lastname: {
        type: String,
        required: true,

    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,

    },
 




},{timestamps:true})

module.exports = mongoose.model('user', user)