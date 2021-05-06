const Order = require('../models/order');

exports.createOrder = (req, res) => {
  const { user, product, quantity, price, product_name, seller, status, payment, paymnet_status } = req.body
  const orders = new Order({
    user: req.user._id,
    seller,
    product,
    quantity: parseInt(req.body.quantity),
    price: parseInt(req.body.price),
    product_name,
    status,
    payment,
    paymnet_status
  });
  orders.save((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
}

class APIfeatures {
  constructor(query, querystring) {
    this.query = query,
      this.querystring = querystring;
  }
  sorting() {
    if (this.querystring.sort) {
      const sortby = this.querystring.sort.split(',').join(' ');
      this.query = this.query.sort(sortby);
    }
    else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  filtering() {
    const queryobj = { ...this.querystring };
    const excludedfields = ['page', 'sort', 'limit'];
    excludedfields.forEach(el => delete queryobj[el]);
    let querystr = JSON.stringify(queryobj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query.find(JSON.parse(querystr));
    return this;
  }
  paginating() {
    const page = this.querystring.page * 1 || 1;
    const limit = this.querystring.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.OrderUpdate = async (req, res) => {
  try {
    const { user, product, seller, status, payment_status } = req.body;
    const order = {
      user,
      seller,
      product,
      status,
      payment_status
    }
    const updatedOrder = await Order.findByIdAndUpdate((req.params.id), { $set: order }, { new: true });
    return res.status(201).json({ updatedOrder });
  }
  catch (err) {
    res.status(404).json('Error' + err)
  }
}

exports.getOrderByID = (req, res) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error' + err))
}

exports.getOrderByUserID = (req, res) => {
  Order.find({"user" : ObjectId(req.params.id)})
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error' + err))
}

var ObjectId = require('mongodb').ObjectId;
exports.getOrderBySellerID = async (req, res) => {
  try {
    const features = new APIfeatures(Order.find({ "seller": ObjectId(req.params.id) }), req.query).filtering().sorting().paginating();
    const orders = await features.query;
    const propertyNames = Object.keys(orders);
    res.status(200).json({
      orders
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}


exports.countOdrer = (req,res) =>{
  Order.countDocuments({seller:req.params.id})
  .then(exercises => res.json(exercises))
  .catch(err => res.status(400).json('Error: ' + err));
}