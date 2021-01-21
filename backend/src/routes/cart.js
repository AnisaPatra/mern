const express = require('express');
const { addItemToCart, addToCart, getCartItems } = require('../controller/cart');
const { requireSignin, retailerMiddleware } = require('../common-middleware');
const router = express.Router();

router.post('/retailer/cart/addtocart', requireSignin, retailerMiddleware, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post('/retailer/getCartItems', requireSignin, retailerMiddleware, getCartItems);

module.exports = router;