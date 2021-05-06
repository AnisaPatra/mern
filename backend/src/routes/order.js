const express = require('express');
const { requireSignin } = require('../common-middleware');
const { createOrder, getOrderByID, getOrders, OrderUpdate, getOrderBySellerID, countOdrer, getOrderByUserID } = require('../controller/order');
const router = express.Router();

router.post('/order/create/',requireSignin,createOrder);
router.get('/order_id/:id',requireSignin,getOrderByID)
router.get('/order/:id',requireSignin,getOrderByUserID);
router.get('/seller/order/:id',requireSignin,getOrderBySellerID);
router.put('/order/:id',requireSignin,OrderUpdate);
router.get('/order/count/:id',countOdrer);

module.exports = router;