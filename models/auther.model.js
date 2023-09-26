const mongoose = require('mongoose')

const autherSchema = new mongoose.Schema({
    firstName:{
        type:string,
        trim:true,
        minlength:3,
        maxlength:50,
        required:true
    },
    lastName:{
        type:string,
        trim:true,
        minlength:3,
        maxlength:50,
        required:true
    },
    nationality:{
        type:string,
        trim:true,
        minlength:3,
        maxlength:50,
        required:true
    },
    image:{
        type:string,
        trim:true,
        minlength:3,
        maxlength:50,
       default:"default.png"
    }
},{timestamp:true})

const AutherModel = mongoose.model("Authers",autherSchema)

module.exports = AutherModel;