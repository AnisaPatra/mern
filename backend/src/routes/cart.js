const express = require('express');
const { addItemToCart, addToCart, getCartItems } = require('../controller/cart');
const { requireSignin } = require('../common-middleware');
const router = express.Router();

router.post('/retailer/cart/addtocart', requireSignin, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post('/retailer/getCartItems', requireSignin, getCartItems);

module.exports = router;