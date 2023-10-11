const {User} = require('../models/user.model')
const express = require('express');
const { getResetPasswordPage } = require('../controller/reset-password');
const router = express.Router();

router.get('/resetepasswrod',getResetPasswordPage)

router.post('/resetepasswrod',(req,res)=>{
    res.status(201).render('forgoten-password')
    const email = req.body.email
    console.log(email);

})

module.exports=router