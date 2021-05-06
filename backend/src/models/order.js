const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    product_name: { type: String, required: true },
    seller:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status:{type:String, default:"Pending",enum: ['Cancelled','Delievered',"Shipped","Pending"]},
    payment:{type:String},
    payment_status:{type:String,default:"Pending",enum: ['Cancelled','Delievered',"Pending"]}
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);