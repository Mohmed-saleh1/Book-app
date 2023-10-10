const express = require('express');
const { getResetPasswordPage } = require('../middlewares/reset-password');
const router = express.Router();

router.get('/resetepasswrod',getResetPasswordPage)