const express = require('express');
const { addItemToCart, getCartItemByID, deleteCart , deleteCartItem, getCartByUser, findCartItem, getCartItems } = require('../controller/cart');
const { requireSignin } = require('../common-middleware');
const router = express.Router();

router.post('/retailer/cart/addtocart', requireSignin, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.get('/retailer/getCartItems/:id', requireSignin, getCartItemByID);
router.delete('/retailer/cart/:id',requireSignin,deleteCart);
router.get('/retailer/cart/:id',requireSignin,getCartByUser);

module.exports = router;