const express = require('express');
const { signup, signin_retailer, signin_seller, getRetailer ,getSeller,deleteUser, updateSeller, 
    updateRetailer,
    getUserById} 
= require('../controller/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');
const {requireSignin, adminMiddleware} = require('../common-middleware');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/retailer/signin', validateSigninRequest, isRequestValidated, signin_retailer);
router.post('/seller/signin', validateSigninRequest, isRequestValidated, signin_seller);
router.get('/retailers', getRetailer);
router.get('/sellers', getSeller);
router.delete('/users/:id',deleteUser);
router.get('/users/:id',getUserById);
router.put('/retailers/update/:id',updateRetailer);
router.put('/sellers/update/:id',updateSeller);

router.post('/profile',requireSignin, (req,res) => {
    res.status(200).json({user:'profile'});
});
module.exports = router;