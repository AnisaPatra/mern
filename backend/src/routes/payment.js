const express = require('express');
const router = express.Router();
const {upload,requireSignin,adminMiddleware} = require('../common-middleware/index');
const{addPaymentOptions,getPaymentOptionById,getPaymentOptions,payment_typeUpdate,deletePaymentOptions} = require('../controller/payment_type')

router.post('/payment_options/create', requireSignin,adminMiddleware,upload.single('picture'), addPaymentOptions);
router.get('/payment_options/', getPaymentOptions);
router.get('/payment_options/:id',getPaymentOptionById);
router.put('/payment_options/:id', requireSignin,adminMiddleware,upload.single('pic'),payment_typeUpdate);
router.delete('/payment_options/:id',requireSignin,adminMiddleware,deletePaymentOptions);
module.exports = router;