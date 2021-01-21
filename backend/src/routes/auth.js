const express = require('express');
const { validationResult } = require('express-validator');
const { signup, requireSignin, signin_retailer, signin_seller } = require('../controller/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/retailer/signin', validateSigninRequest, isRequestValidated, signin_retailer);
router.post('/seller/signin', validateSigninRequest, isRequestValidated, signin_seller);

router.post('/profile',requireSignin, (req,res) => {
    res.status(200).json({user:'profile'});
});
module.exports = router;