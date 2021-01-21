const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentCategory == null) {
    category = categories.filter((cat) => cat.parentCategory == undefined);
  } else {
    category = categories.filter((cat) => cat.parentCategory == parentCategory);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentCategory: cate.parentCategory,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
    createdBy: req.user._id,
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

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
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
