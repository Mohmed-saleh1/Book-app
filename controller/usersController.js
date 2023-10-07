const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const {User,validateUpdateUser}= require('../models/user.model')


/**
 * @desc Update user 
 * @method Put 
 * @route /api/auth
 * @access Private
 **/
const updateUser = asyncHandler(async(req,res)=>{

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
 
 })

/**
 * @desc get all users
 * @method get 
 * @route /api/auth
 * @access public
 **/
const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({}).select("-password")
    if (users) {
       return res.status(200).json({result:users.length,users})
    }
    res.status(404).json({Message:"there is no users"})
 })

 /**
 * @desc get user by id
 * @method Post 
 * @route /api/users/id
 * @access private (only admins)
 **/
const getUserById = asyncHandler(async(req,res)=>{
    const users = await User.findById(req.params.id).select("-password")
    if (users) {
       return res.status(200).json({result:users.length,users})
    }
    res.status(404).json({Message:"there is no users"})
 })

/**
 * @desc Delete user 
 * @method delete 
 * @route /api/users/id
 * @access private (only admin & user himself )
 **/
const deleteUser = asyncHandler(async(req,res)=>{

    const {id}=req.params
    try {
       const user = await User.findByIdAndDelete(id)
       res.status(200).json({message:"the user deleted successfully ",user})
    } catch (error) {
       res.status(404).json({errorMessage:error.details[0].message})
    }
 })
 module.exports={
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser

 }