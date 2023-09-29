const mongoose = require('mongoose')

const autherSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:50,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:50,
        required:true
    },
    nationality:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:50,
        required:true
    },
    image:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:50,
       default:"default.png"
    }
},{timestamps:true})

const Author = mongoose.model("Authers",autherSchema)

module.exports = Author;