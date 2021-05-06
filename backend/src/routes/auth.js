const express = require('express');
const { signup, signin_retailer, signin_seller, getRetailer ,getSeller,deleteUser, updateSeller, 
    updateRetailer,
    getUserById,
    getUsers,
    updateUser,
    signout} 
= require('../controller/auth');
const { validateSigninRequest, isRequestValidated } = require('../validators/auth');
const {requireSignin, adminMiddleware, adminorreatilerMiddleware, adminorsellerMiddleware} = require('../common-middleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/retailer/signin', validateSigninRequest, isRequestValidated, signin_retailer);
router.post('/seller/signin', validateSigninRequest, isRequestValidated, signin_seller);
router.get('/retailers', getRetailer);
router.get('/sellers', getSeller);
router.delete('/users/:id',deleteUser);
router.get('/users/:id',getUserById);
router.get('/users',getUsers);
router.put('/retailers/update/:id',requireSignin,adminorreatilerMiddleware,updateRetailer);
router.put('/sellers/update/:id',requireSignin,adminorsellerMiddleware,updateSeller);
router.put('/users/update/:id',requireSignin,adminMiddleware,updateUser);
router.post('/users/signout',signout);
router.post('/profile',requireSignin, (req,res) => {
    res.status(200).json({user:'profile'});
});
module.exports = router;