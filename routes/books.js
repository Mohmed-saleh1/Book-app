const express = require('express');
const router = express.Router();
const {Books,validateCreateBook,validateUpdateBook}= require('../models/book.model.js')
const asyncHandler = require('express-async-handler')
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken.js')

/**
 * @desc create a new book
 * @route /api/books
 * @method Post
 * @access private (Only admins)
 */
router.post('/',verifyTokenAndAdmin,asyncHandler(async(req,res)=>{

    const {error} =validateCreateBook(req.body)
     if (error) return res.status(404).json({ErorMessage:error.details[0].message})
        
    try {
        const book = new Books({
            title:req.body.title,
            auther:req.body.auther,
            description:req.body.description,
            cover:req.body.cover,
            price:req.body.price
        })
        const result = await book.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(404).json({errorMessage:error.details[0].message})
    }
   
    
}))
 
/**
 * @desc Get All Books
 * @route /api/books
 * @method Get
 * @access Public
 */
 router.get('/',asyncHandler(async(req,res)=>{
    const book = await Books.find({})
    if(book){
        if(book.length==0){
            res.status(200).json("there is no books ")
        }
        res.status(200).json({results:book.length,book})
    }
})),
 
 /**
 * @desc Get Books By ID
 * @route /api/books/:id
 * @method Get
 * @access Public
 */
router.get('/:id',asyncHandler(async(req,res)=>{
     const book =await Books.findById(req.params.id)
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json(`there is no error for this id ${req.params.id}`)
    }
}))

 /**
 * @desc Update a book By ID
 * @route /api/books/:id
 * @method PUT
 * @access private (Only admins)
 */
router.put('/:id',verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    
    const {error} = validateUpdateBook(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }

    const{id}=req.params
     
    try {
        const book = await Books.findByIdAndUpdate(id,{
            $set:{
            title:req.body.title,
            price:req.body.price,
            description:req.body.description,
            auther:req.body.auther,
            cover:req.body.cover
          }},{new:true})
        
        res.status(200).json(book)
    } catch (error) {
        res.status(404).json({message:error.details[0].message})
    }
}))
 /**
 * @desc Delete a book By ID
 * @route /api/books/:id
 * @method Delete
 * @access private (Only admins)
 */
 router.delete('/:id',verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const book = await Books.findByIdAndDelete(req.params.id)
    if (book) {
        res.status(200).json({message:`the book deleted success`,book})
   } else {
        res.status(404).json({message : `the book for id ${book.id} is not found`})  
    }
}))
module.exports=router