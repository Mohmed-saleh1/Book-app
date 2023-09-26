const express = require('express');
const Joi = require('joi');
const router = express.Router();


const books = [
    {
     id:1,
     title:"Black Swan",
     auther:"Nasim Taleb",
     description:"About Black Swan",
     price:10,
     cover:"soft cover"
    }, {
     id:2,
     title:"Rich Dad Poor Dad",
     auther:"Robert Kiyosaki",
     description:"About Rich Dad and Poor Dad",
     price:12,
     cover:"soft cover"
    }
 ]
 router.get('/',(req,res)=>{
    res.status(200).json({books_no:books.length,books})
 })
 
router.get('/:id',(req,res)=>{
    const book = books.find(b=>b.id === +req.params.id);
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json(`there is no error for this id ${req.params.id}`)
    }
})
router.post('/',(req,res)=>{
    const schema =Joi.object({
        title:Joi.string().trim().min(3).max(50).required(),
        auther:Joi.string().trim().min(3).max(50).required(),
        description:Joi.string().trim().min(3).max(50),
        price:Joi.number().min(0).required(),
    //    cover:Joi.string().min(0).required()
    }) 
    const {error}=schema.validate(req.body)
    if (error) return res.status(404).json({ErorMessage:error.details[0].message})
        
    const book = {
        id:books.length+1,
        title:req.body.title,
        auther:req.body.auther,
        description:req.body.description,
        price:req.body.price
    }
        books.push(book)
        res.status(200).json(books)
        
    
})

module.exports=router;