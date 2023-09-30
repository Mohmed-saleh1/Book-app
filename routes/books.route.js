const express = require('express');
const router = express.Router();
const {}= require('../models/book.model.js')


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
/**
 * @desc Get All Books
 * @route /api/books
 * @method Get
 * @access Public
 */
 router.get('/',(req,res)=>{
    res.status(200).json({books_no:books.length,books})
 })
 
 /**
 * @desc Get Books By ID
 * @route /api/books/:id
 * @method Get
 * @access Public
 */
router.get('/:id',(req,res)=>{
    const book = books.find(b=>b.id === +req.params.id);
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json(`there is no error for this id ${req.params.id}`)
    }
})
/**
 * @desc Create a New Book
 * @route /api/books
 * @method Post
 * @access Public
 */
router.post('/',(req,res)=>{
   
   const {error} =validateCreateBook(req.body)
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
 /**
 * @desc Update a book By ID
 * @route /api/books/:id
 * @method PUT
 * @access Public
 */
router.put('/:id',(req,res)=>{
    const book = books.find((b)=>b.id === +req.params.id)
    const {error} = validateUpdateBook(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }
    if (book) {
        res.status(200).json({message : `the book for id ${book.id} is updated`})
    } else {
        res.status(404).json({message : `the book for id ${book.id} is not found`})  
    }
})
 /**
 * @desc Delete a book By ID
 * @route /api/books/:id
 * @method Delete
 * @access Public
 */
 router.delete('/:id',(req,res)=>{
    const book = books.find((b)=>b.id === +req.params.id)
    const {error} = validateUpdateBook(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }
    if (book) {
        res.status(200).json({message : `the book for id ${book.id} is deleted`})
    } else {
        res.status(404).json({message : `the book for id ${book.id} is not found`})  
    }
})


module.exports=router;