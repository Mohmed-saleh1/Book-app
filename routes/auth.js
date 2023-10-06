const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User,validateRegisterUser,validateLoginUser}= require('../models/user.model')

/**
 * @desc creating a new user 
 * @method Post 
 * @route /api/auth
 * @access public
 **/

router.post('/register',asyncHandler(async(req,res)=>{

          const{error}=validateRegisterUser(req.body)
         if (error) return res.status(404).json({ErorMessage:error.details[0].message})

         const user = await User.findOne({email:req.body.email})
         if(user) return  res.status(400).json({Message:"this user allready exists"})
           req.body.password = bcrypt.hashSync(req.body.password,10)

         const newUser = new User({
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password,
          })
          const result = await newUser.save()
          const token = null;
          const {password,...other}=result._doc;
         res.status(201).json({...other,token})
        
}))

/**
 * @desc user login 
 * @method Post 
 * @route /api/auth/login
 * @access public
 **/
router.post('/login',asyncHandler(async(req,res)=>{

      const{error}=validateLoginUser(req.body)
      if (error) return res.status(400).json({errorMessage:error.details[0].message})

      const user =await User.findOne({email:req.body.email})
      if(!user) return  res.status(404).json({message:"inValid Email"})
      
      const isMatch=await bcrypt.compareSync(req.body.password,user.password)
      if (!isMatch) return res.status(404).json({message:"inValid Password "})
      const token = jwt.sign({id:user.id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY)

      const {password,...other}=user._doc;
      res.status(200).json({...other,token})

 }
))

/**
 * @desc Delete user 
 * @method delete 
 * @route /api/auth
 * @access public
 **/
router.delete('/deleteuser/:id',asyncHandler(async(req,res)=>{

   const {id}=req.params
   try {
      const user = await User.findByIdAndDelete(id)
      res.status(200).json({message:"the user deleted successfully ",user})
   } catch (error) {
      res.status(404).json({errorMessage:error.details[0].message})
   }
}))

module.exports=router;