const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const {User,validateUpdateUser}= require('../models/user.model')
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken')

/**
 * @desc Update user 
 * @method Put 
 * @route /api/auth
 * @access Private
 **/
router.put('/:id',verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{

   const {error} = validateUpdateUser(req.body)
   if (error) return res.status(404).json({errorMessage:error.details[0].message})

   if(req.body.password) req.body.password = bcrypt.hashSync(req.body.password,10)
   
   const {id}=req.params
   const user = await User.findByIdAndUpdate(id,{
      $set:{
        
         email:req.body.email,
         userName:req.body.userName,
         password:req.body.password
      }
   },{new:true}).select('-password')
    res.status(200).json(user)

}))

/**
 * @desc get all users
 * @method Post 
 * @route /api/auth
 * @access public
 **/
router.get('/',verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
   const users = await User.find({}).select("-password")
   if (users) {
      return res.status(200).json({result:users.length,users})
   }
   res.status(404).json({Message:"there is no users"})
}))

module.exports=router