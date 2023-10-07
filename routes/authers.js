const express = require('express');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken.js');
const { getAllAuthers, getAutherById, createAuther, updateAuther, deleteAuther } = require('../controller/authersController.js');

router.route('/')
  .get(getAllAuthers)
  .post(verifyTokenAndAdmin,createAuther)
 

router.route('/:id')
   .get(getAutherById)
   .put(verifyTokenAndAdmin,updateAuther)
   .delete(verifyTokenAndAdmin,deleteAuther)


module.exports=router;