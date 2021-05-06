const express = require('express');
const router = express.Router();
const {requireSignin, adminorsellerMiddleware, upload} = require('../common-middleware/index');
const { createProduct, getProducts, deleteProduct, productUpdate, getProductforseller, getproductById, getProductss, countProduct, countProductBySeller, search } = require('../controller/product');

router.post('/product/create', requireSignin, adminorsellerMiddleware, upload.array('productPicture'), createProduct);
router.get('/product/getproducts', getProducts);
router.post('/product/count',countProduct);
router.get('/product/count/:id',countProductBySeller);
router.get('/product/getproductss', getProductss);
router.get('/product/seller/:id',getProductforseller);
router.post('/product/search',search);
router.get('/product/:id',getproductById);
router.delete('/product/:id',requireSignin,adminorsellerMiddleware,deleteProduct);
router.put('/product/update/:id', requireSignin,adminorsellerMiddleware,upload.array('productPicture'), productUpdate);
module.exports = router;