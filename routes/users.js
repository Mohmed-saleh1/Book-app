const express = require('express')
const router = express.Router()
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const { getAllUsers, updateUser, getUserById, deleteUser } = require('../controller/usersController')

router.route("/").get(verifyTokenAndAdmin,getAllUsers)

router.route("/:id")
   .get(verifyTokenAndAuthorization,getUserById)
   .put(verifyTokenAndAuthorization,updateUser)
   .delete(verifyTokenAndAdmin,deleteUser)

module.exports=router