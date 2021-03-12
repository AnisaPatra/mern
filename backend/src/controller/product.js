const Product = require('../models/product');
const slugify = require('slugify');
const { isValidObjectId } = require('mongoose');


exports.createProduct = (req, res) => {
    //res.status(200).json( { file: req.files, body: req.body } );
  
    const { name,brand, price, description, parent_category,sub_category, quantity, m_c, createdBy } = req.body;
    let productPictures = [];
  
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: "/public/" + file.filename };
      });
    }
  
    const product = new Product({
      name: name,
      slug: slugify(name),
      price,
      brand,
      quantity,
      description,
      productPictures,
      parent_category,
      sub_category,
      m_c,
      createdBy: req.user._id,
    });
  
    product.save((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(201).json({ product });
      }
    });
  };

  class APIfeatures {
    constructor(query, querystring) {
        this.query = query,
            this.querystring = querystring;
    }
    sorting() {
        if (this.query.sort) {
            const sortby = this.querystring.sort.split(',').join(' ');
            this.query = this.query.sort(sortby);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    filtering(){
      const queryobj = {...this.querystring};
      const excludedfields = ['page','sort','limit'];
      excludedfields.forEach(el => delete queryobj[el]);
      let querystr = JSON.stringify(queryobj);
      querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
      this.query.find(JSON.parse(querystr));
      return this;
    }
    paginating(){
      const page = this.querystring.page * 1 || 1;
      const limit = this.querystring.limit * 1 || 2;
      const skip = (page -1) * limit;
       this.query = this.query.skip(skip).limit(limit);
       return this;
    }
}

exports.getProductss = async (req, res) => {
  try {
      const features = new APIfeatures(Product.find({}), req.query).filtering();
      const retailing = await features.query;
      res.status(200).json({
          retailing
      });
  } catch (err) {
      res.status(404).json({
          status: 'fail',
          message: err
      })
  }
}
exports.getproductById = (req,res) =>{
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .catch(err => res.status(400).json('Error' + err))

}

var ObjectId = require('mongodb').ObjectId;
exports.getProductforseller = (req,res) => {
  Product.find({"createdBy" : ObjectId(req.params.id)})
.then(pro => res.json(pro))
.catch(err => res.status(400).json(err))
}

  exports.getProducts = (req,res) => {
    Product.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
  }

  exports.getProductsbySubMens = (req,res) =>{
    Product.find({"sub_category": ObjectId("600079b39a6fbb5d58314633")})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
  }

  exports.getProductsbySubStaple = (req,res) =>{
    Product.find({"sub_category": ObjectId("60007ad99a6fbb5d58314638")})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
  }

  exports.getProductsbySubPC = (req,res) =>{
    Product.find({"sub_category": ObjectId("60007a7d9a6fbb5d58314635")})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
  }

  exports.getProductsbySubWomen = (req,res) =>{
    Product.find({"sub_category": ObjectId("603bd7a925b51444e49e8168")})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  

  exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
  }

  exports.productUpdate = async (req, res) => {
    try{
      const {name,brand, price, description, parent_category,sub_category, quantity, m_c, createdBy, productPictures } = req.body;
      const product={
        name: req.body.name,brand:req.body.brand,price:req.body.price,description:req.body.description,
        parent_category:req.body.parent_category,sub_category:req.body.sub_category,quantity:req.body.quantity,
        m_c:req.body.m_c, createdBy: req.user._id}
  
        if (req.files.length > 0) {
          product.productPictures = req.files.map((file) => {
            return { img: "/public/" + file.filename };
          });
        }
      const updatedProduct = await Product.findByIdAndUpdate((req.params.id), {$set:product}, { new: true });
      return res.status(201).json({ updatedProduct });
    }
    catch (err) {
      res.status(404).json('Error' + err)
  }
  }