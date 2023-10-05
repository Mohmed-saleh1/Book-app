const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const {User,validateUpdateUser}= require('../models/user.model')
const jwt = require('jsonwebtoken')


/**
 * @desc Update user 
 * @method Put 
 * @route /api/auth
 * @access public
 **/
router.put('/:id',asyncHandler(async(req,res)=>{

   const {error} = validateUpdateUser(req.body)
   if (error) return res.status(404).json({errorMessage:error.details[0].message})

   if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password,10)
   
   const {id}=req.params
   const user = await User.findByIdAndUpdate(id,{
      $set:{
        
         email:req.body.email,
         isAdmin:req.body.isAdmin,
         userName:req.body.userName,
         password:req.body.password
      }
   },{new:true}).select('-password')
   console.log(req.headers.token)
   res.status(200).json(user)

}))

module.exports=router