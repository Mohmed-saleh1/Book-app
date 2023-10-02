const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        trim :true,
        required:true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    userName:{
        type:String,
        trim :true,
        required:true,
        minlength:3,
        maxlength:100,
    },
    email:{
        type:String,
        trim :true,
        required:true,
        minlength:5,
    },
    isAdmin:{
        type:boolean,
       default:false
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

//

module.exports= User