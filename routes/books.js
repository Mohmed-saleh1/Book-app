const express = require('express');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken.js');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controller/bookController.js');

router.route('/')
    .post(verifyTokenAndAdmin,createBook)
    .get(getAllBooks)

router.route('/:id')
    .get(getBookById)
    .put(verifyTokenAndAdmin,updateBook)
    .delete(verifyTokenAndAdmin,deleteBook)
 
    module.exports=router