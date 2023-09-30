const mongoose = require('mongoose');
const Author = require('./auther.model');
const Joi = require('joi');


const bookSchema = mongoose.Schema({
 title:{
    type:String,
    required:true,
    trim:true,
    minlength:4,
    maxlength:100,
 },
 author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Author",
 },
 description:{
    type:String,
    required:true,
    trim:true,

 },
 price:{
   type:String,
   required:true,
   min:0,
 },
 cover:{
   type:String,
   required:true,
   enum:["soft cover","hard cover"]
 }
},{timestamps:true});

const Books = mongoose.model("Books",bookSchema);

//validate Update book
function validateUpdateBook(obj){

   const schema =Joi.object({
       title:Joi.string().trim().min(3).max(50),
       auther:Joi.string().trim().min(3).max(50),
       description:Joi.string().trim().min(3).max(50),
       price:Joi.number().min(0),
       //cover:Joi.string().min(0)
   }) 
   return schema.validate(obj)  
}

//Validate create book
function validateCreateBook(obj){

   const schema =Joi.object({
       title:Joi.string().trim().min(3).max(50).required(),
       auther:Joi.string().trim().min(3).max(50).required(),
       description:Joi.string().trim().min(3).max(50),
       price:Joi.number().min(0).required(),
       //cover:Joi.string().min(0).required()
   }) 
   return schema.validate(obj)  
}
module.exports={
    Books,
    validateCreateBook,
    validateUpdateBook
}