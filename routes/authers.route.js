const express = require('express');
const Joi = require('joi');
const router = express.Router();
const AutherModel = require('../models/auther.model.js')


/**
 * @desc Get All authers
 * @route /api/books
 * @method Get
 * @access Public
 */
 router.get('/',async(req,res)=>{
    try {
        const authers= await AutherModel.find({}).sort({firstName:-1}).select("firstName lastName -_id")
        res.status(200).json(authers);
    } catch (error) {

        console.log(error);
        res.status(500).json({message:"something went wrong"})    
    }
   
  })
 
 /**
 * @desc Get auther By ID
 * @route /api/authers/:id
 * @method Get
 * @access Public
 */
router.get('/:id',async(req,res)=>{
    const {id}= req.params

    try {
        const auther = await AutherModel.findById(id)
        res.status(200).json(auther)
        
    } catch (error) {

        console.log(error);
        res.status(404).json({message:"something went wrong"})
        
    }
})
/**
 * @desc Create a New auther
 * @route /api/authers
 * @method Post
 * @access Public
 */
router.post('/',async(req,res)=>{
    
   const {error} =validateCreateAuther(req.body)
     if (error) return res.status(404).json({ErorMessage:error.details[0].message})
        
   try {
    const auther = new AutherModel ({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        image:req.body.image
    })
    const result = await auther.save();
    res.status(200).json(result)
        
   } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"})
    
   }
    
})
 /**
 * @desc Update an auther By ID
 * @route /api/authers/:id
 * @method PUT
 * @access Public
 */
router.put('/:id',async(req,res)=>{

     const {error} = validateUpdateAuther(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }
    const {id}= req.params
    const {firstName}=req.body
    const {lastName}=req.body

 
    try {
        console.log(id)
        const auther = await AutherModel.findByIdAndUpdate(id,{firstName,lastName},{new:true})
        res.status(200).json(auther)
        
    } catch (error) {

        console.log(error);
        res.status(404).json({message:"something went wrong"})
        
    }
})
 /**
 * @desc Delete an auther By ID
 * @route /api/autheras/:id
 * @method Delete
 * @access Public
 */
 router.delete('/:id',async(req,res)=>{
     const {error} = validateUpdateAuther(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }
    const {id}= req.params

    try {
        const auther = await AutherModel.findByIdAndDelete(id)
        res.status(200).json(auther)
        
    } catch (error) {

        console.log(error);
        res.status(404).json({message:"something went wrong"})
        
    }
})
//validate Update auther
function validateUpdateAuther(obj){

    const schema =Joi.object({
        firstName:Joi.string().trim().min(3).max(50) ,
        lastName:Joi.string().trim().min(3).max(50) ,
        nationality:Joi.string().trim().min(3).max(50),
        image:Joi.string().min(1).trim().max(20) 
    }) 
    return schema.validate(obj)   
}

//Validate create auther
function validateCreateAuther(obj){

    const schema =Joi.object({
        firstName:Joi.string().trim().min(3).max(50).required(),
        lastName:Joi.string().trim().min(3).max(50).required(),
        nationality:Joi.string().trim().min(3).max(50),
        image:Joi.string().min(1).trim().max(20).required()
    }) 
    return schema.validate(obj)  
}

module.exports=router;