const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

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
    password:{
        type:String,
        trim :true,
        required:true,
        minlength:5,
    },
    isAdmin:{
        type:Boolean,
       default:false
    }
},{timestamps:true})

// GENERATE TOKEN FUNCTION
userSchema.methods.generateToken = function (){
    return jwt.sign({ id:this._id, isAdmin:this.isAdmin}, process.env.JWT_SECRET_KEY)
 }

//USER MODEL
const User = mongoose.model('User',userSchema)

// Validate create new user 
function validateRegisterUser(obj){

    const Schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).email().required(),
        userName:Joi.string().trim().min(3).max(100).required(),
        password:Joi.string().trim().trim().min(5).required(),
        isAdmin:Joi.bool()
    })

    return Schema.validate(obj)
}

// Validate Login user
function validateLoginUser(obj){

    const Schema = Joi.object({
        email:Joi.string().trim().required().min(5).max(100).email(),
        password:Joi.string().trim().min(5).required(),
    })

    return Schema.validate(obj)
}

// Validate Update user
function validateUpdateUser(obj){

    const Schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).email(),
        userName:Joi.string().trim().min(3).max(100),
        password:Joi.string().trim().min(5),
     })

    return Schema.validate(obj)
}


module.exports= {User,validateRegisterUser,validateLoginUser,validateUpdateUser}
