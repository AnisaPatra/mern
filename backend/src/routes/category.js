const express = require('express');
const { addCategory, getCategoriess, getSubCategory, getParentCategory, categoryUpdate , deleteCategory, 
    getCategorieById, getSubCategoryByParentName} = require('../controller/category');
const router = express.Router();
const {upload,requireSignin,adminMiddleware} = require('../common-middleware/index');

router.post('/category/create',requireSignin,adminMiddleware, upload.single('CategoryImage'), addCategory);
router.get('/category/getcategory', getCategoriess);
router.get('/category/getcatbyid/:id',getCategorieById);
router.get('/category/subcategory', getSubCategory);
router.get('/category/parentCategory',getParentCategory);
router.put('/category/update/:id', requireSignin,adminMiddleware,upload.single('CategoryImage'),categoryUpdate);
router.delete('/category/:id',requireSignin,adminMiddleware,deleteCategory);
router.post('/catgeory/getsubcategorybyparentcategory',getSubCategoryByParentName);
module.exports = router;