const mongoose = require('mongoose');
const Author = require('./auther.model');

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
},{})

const Books = mongoose.model("Books",bookSchema);

module.exports={
    Books,
}