const mongoose = require('mongoose')
const Joi = require('joi');

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

//validate Update auther
function validateUpdateAuther(obj){
    const schema =Joi.object({
        firstName:Joi.string().trim().min(3).max(50) ,
        lastName:Joi.string().trim().min(3).max(50) ,
        nationality:Joi.string().trim().min(3).max(50),
        image:Joi.string().min(1).trim().max(20) 
    }) 
    return schema.validate(obj)   
}

//Validate create auther
function validateCreateAuther(obj){

    const schema =Joi.object({
        firstName:Joi.string().trim().min(3).max(50).required(),
        lastName:Joi.string().trim().min(3).max(50).required(),
        nationality:Joi.string().trim().min(3).max(50),
        image:Joi.string().min(1).trim().max(20).required()
    }) 
    return schema.validate(obj)  
}

module.exports = {Author,validateUpdateAuther,validateCreateAuther};