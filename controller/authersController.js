 const asyncHandler = require('express-async-handler')
const {Author,validateCreateAuther,validateUpdateAuther} = require('../models/auther.model.js')

/**
 * @desc Get All authers
 * @route /api/books
 * @method Get
 * @access Public
 */
const getAllAuthers=asyncHandler(async(req,res)=>{
    try {
        const authers= await Author.find({}).sort({firstName:-1}).select("firstName lastName -_id")
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
  const getAutherById=asyncHandler(async(req,res)=>{
    const {id}= req.params

    try {
        const auther = await Author.findById(id)
        if (auther) {
        res.status(200).json(auther)
        }else{
            res.status(404).json({errorMessage :`there is no user for this id ${id}`})
        }
        
    } catch (error) {

        console.log(error);
        res.status(404).json({message:"something went wrong"})
        
    }
})

/**
 * @desc Create a New auther
 * @route /api/authers
 * @method post
 * @access private (Only admins)
 */
const createAuther = asyncHandler(async(req,res)=>{
    
    const {error} =validateCreateAuther(req.body)
      if (error) return res.status(404).json({ErorMessage:error.details[0].message})
         
    try {
     const auther = new Author ({
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
 * @access private (Only admins)
 */
const updateAuther = asyncHandler(async(req,res)=>{

    const {error} = validateUpdateAuther(req.body)
   if (error) {
       return res.status(404).json({message:error.details[0].message})
   }
   const {id}= req.params
   const {firstName}=req.body
   const {lastName}=req.body


   try {
       console.log(id)
       const auther = await Author.findByIdAndUpdate(id,{firstName,lastName},{new:true})
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
 * @access private (Only admins)
 */
const deleteAuther = asyncHandler(async(req,res)=>{
    const {error} = validateUpdateAuther(req.body)
   if (error) {
       return res.status(404).json({message:error.details[0].message})
   }
   const {id}= req.params

   try {
       const auther = await Author.findByIdAndDelete(id)
       res.status(200).json(auther)
       
   } catch (error) {

       console.log(error);
       res.status(404).json({message:"something went wrong"})
       
   }
})


module.exports={
    getAllAuthers,
    getAutherById,
    createAuther,
    updateAuther,
    deleteAuther
    
}