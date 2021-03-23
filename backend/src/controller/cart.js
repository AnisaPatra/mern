
const Cart = require('../models/cart');

exports.addItemToCart = (req,res) =>{
    Cart.findOne({user : req.user._id})
    .exec((error,cart) =>{
        if(error) return res.status(400).json({error});
        if(cart){

            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition ,update;

            if(item){
                condition = {"user" : req.user._id, "cartItems.product" : product};
                update = {
                    "$set" : {
                        "cartItems.$" : {
                            ...req.body.cartItems,
                            quantity : parseInt(item.quantity + req.body.cartItems.quantity),
                            price : parseInt(item.price + req.body.cartItems.price)
                        }
                    }
                };
            }
            else{
                condition = { user : req.user._id};
                update = {
                    "$push" : {
                        "cartItems" : req.body.cartItems
                    }
                };  
            }
            Cart.findOneAndUpdate(condition,update)
            .exec((error,_cart) => {
                if(error) return res.status(400).json({error});
                if(_cart){
                    return res.status(201).json({cart :_cart})
                }
            })
            // res.json({message :'cart'})
            
        }
        else{
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            });

            cart.save((error,cart) =>{
                if(error) return res.status(400).json({error});
                if(cart){
                    return res.status(201).json({cart});
                }
            });
        }
    });
    
};

exports.getCartItemByID = (req,res) =>{
    Cart.findById(req.params.id)
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error' + err))
}

exports.deleteCart = (req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Cart deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

var ObjectId = require('mongodb').ObjectId;

exports.getCartByUser = (req,res) =>{
    Cart.find({"user" : ObjectId(req.params.id)})
    .then(pro => res.json(pro))
    .catch(err => res.status(400).json(err))
}
