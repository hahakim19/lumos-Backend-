const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const recette = new Schema({

   
   

    Title: {
        type: String,
        required:true,
       

    },

    Content:{
        type: String,
        required: true,

    },

    id_user:{
        type:String,
        required:true,
    }



 




},{timestamps:true})

module.exports = mongoose.model('Recette', recette)