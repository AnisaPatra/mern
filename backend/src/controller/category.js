const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`
  };

  if (req.file) {
    categoryObj.CategoryImage = "/public/" + req.file.filename;
  }

  if (req.body.parentCategory) {
    categoryObj.parentCategory = req.body.parentCategory;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategorieById = (req, res) => {
  Category.findById(req.params.id)
  .then(category => res.json(category))
  .catch(err => res.status(400).json('Error' + err))
};

exports.getSubCategory = (req,res) => {
  Category.find({ "parentCategory": { $exists: true, $ne: null } })
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
}

exports.getParentCategory = (req,res) => {
  Category.find({ "parentCategory": { "$exists": false } })
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
}

exports.getSubCategoryByParentName = (req,res) => {
    try{
      console.log(req.body.parentCategory);
    Category.find({"parentCategory" : (req.body.parentCategory)})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
    }
    catch(err){
      res.status(404).json('Error' + err)
    }
}

exports.categoryUpdate = async (req, res) => {
  try{
    const {name, parentCategory, CategoryImage} = req.body;
    const category={
      name: req.body.name}
    if (req.file) {
      category.CategoryImage = "/public/" + req.file.filename;
    }
    if (req.body.parentCategory) {
      category.parentCategory = parentCategory;
    }
    const updatedCategory = await Category.findByIdAndUpdate((req.params.id), {$set:category}, { new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
  catch (err) {
    res.status(404).json('Error' + err)
}
}

exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.params.id)
      .then(() => res.json('Category deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
}


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


exports.getCategoriess = async (req, res) => {
  try {
      const features = new APIfeatures(Category.find(), req.query).filtering();
      const retailing = await features.query;
      const propertyNames = Object.keys(retailing);
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
