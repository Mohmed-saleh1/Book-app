const express = require('express');
const Joi = require('joi');
const router = express.Router();


const authers = [
   {
    id:1,
    firstName:"MOhamed",
    lastName:"Saleh",
    nationality:"Egypt",
    image:"default-image.png"
   },
    {
    id:2,
    firstName:"ibrahim",
    lastName:"elsakaram",
    nationality:"saudia ",
    image:"default-image.png"
   }
 ]
/**
 * @desc Get All authers
 * @route /api/books
 * @method Get
 * @access Public
 */
 router.get('/',(req,res)=>{
    res.status(200).json({authers_no:authers.length,authers})
 })
 
 /**
 * @desc Get auther By ID
 * @route /api/authers/:id
 * @method Get
 * @access Public
 */
router.get('/:id',(req,res)=>{
    const auther = authers.find(a=>a.id === +req.params.id);
    if (auther) {
        res.status(200).json(auther)
    } else {
        res.status(404).json(`there is no error for this id ${req.params.id}`)
    }
})
/**
 * @desc Create a New auther
 * @route /api/authers
 * @method Post
 * @access Public
 */
router.post('/',(req,res)=>{
   
   const {error} =validateCreateAuther(req.body)
     if (error) return res.status(404).json({ErorMessage:error.details[0].message})
        
    const book = {
        id:authers.length+1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        image:req.body.image
    }
        authers.push(book)
        res.status(200).json(authers)
        
    
})
 /**
 * @desc Update an auther By ID
 * @route /api/authers/:id
 * @method PUT
 * @access Public
 */
router.put('/:id',(req,res)=>{
    const auther = authers.find((a)=>a.id === +req.params.id)
    const {error} = validateUpdateAuther(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }
    if (auther) {
        res.status(200).json({message : `the auther for id ${auther.id} is updated`})
    } else {
        res.status(404).json({message : `the auther for id ${auther.id} is not found`})  
    }
})
 /**
 * @desc Delete an auther By ID
 * @route /api/autheras/:id
 * @method Delete
 * @access Public
 */
 router.delete('/:id',(req,res)=>{
    const auther = authers.find((a)=>a.id === +req.params.id)
    const {error} = validateUpdateAuther(req.body)
    if (error) {
        return res.status(404).json({message:error.details[0].message})
    }
    if (auther) {
        res.status(200).json({message : `the auther for id ${auther.id} is deleted`})
    } else {
        res.status(404).json({message : `the auther for id ${auther.id} is not found`})  
    }
})
//validate Update auther
function validateUpdateAuther(obj){

    const schema =Joi.object({
        firstName:Joi.string().trim().min(3).max(50) ,
        lastName:Joi.string().trim().min(3).max(50) ,
        nationality:Joi.string().trim().min(3).max(50),
        image:Joi.number().min(1).trim().max(20) 
    }) 
    return schema.validate(obj)  
}

//Validate create auther
function validateCreateAuther(obj){

    const schema =Joi.object({
        firstName:Joi.string().trim().min(3).max(50).required(),
        lastName:Joi.string().trim().min(3).max(50).required(),
        nationality:Joi.string().trim().min(3).max(50),
        image:Joi.number().min(1).trim().max(20).required()
    }) 
    return schema.validate(obj)  
}

module.exports=router;