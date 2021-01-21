const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });
        const {
            name,
            email,
            password,
            contactNumber,
            shop_name,
            gstin,
            role
        } = req.body;
        const _user = new User({ 
            name,
            email,
            password,
            contactNumber,
            shop_name,
            gstin,
            role,
            username : Math.random().toString()
        });
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: `Something went wrong, ${error}`
                });
            }
            if(data){
                if (_user.role === 'retailer'){
                    return res.status(201).json({
                        message: 'Reatiler created Successfully..!'
                    })
                }
                if (_user.role === 'seller'){
                    return res.status(201).json({
                        message: 'Seller created Successfully..!'
                    })
                }
            }
        });
    });
}

exports.signin_retailer = (req,res) => {
    User.findOne({ email: req.body.email ,role : req.body.role})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'retailer'){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id,email,contactNumber,role,shop_name,gstin} = user;
                res.status(200).json({
                    token,
                    user: {_id, email,contactNumber,role,shop_name,gstin}
                });
            }
            else{
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    });
}

exports.signin_seller = (req,res) => {
    User.findOne({ email: req.body.email ,role : req.body.role})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'seller'){
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id,email,contactNumber,role,shop_name,gstin} = user;
                res.status(200).json({
                    token,
                    user: {_id,email,contactNumber,role,shop_name,gstin}
                });
            }
            else{
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        }else{
            return res.status(400).json({message: 'Something went wrong'});
        }
    });
}

exports.requireSignin = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
}