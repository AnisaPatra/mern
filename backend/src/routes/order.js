const express = require('express');
const { requireSignin } = require('../common-middleware');
const { createOrder, getOrderByID, getOrders, OrderUpdate } = require('../controller/order');
const router = express.Router();

router.post('/order/create/',requireSignin,createOrder);
router.get('/order/:id',requireSignin,getOrderByID);
router.get('/orders',requireSignin,getOrders);
router.put('/order/:id',requireSignin,OrderUpdate);

module.exports = router;