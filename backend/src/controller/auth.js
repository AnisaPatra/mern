const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) return res.status(400).json({
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
                username: Math.random().toString()
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: `Something went wrong, ${error}`
                    });
                }
                if (data) {
                    if (_user.role === 'retailer') {
                        return res.status(201).json({
                            message: 'Reatiler created Successfully..!'
                        })
                    }
                    if (_user.role === 'seller') {
                        return res.status(201).json({
                            message: 'Seller created Successfully..!'
                        })
                    }
                }
            });
        });
}

exports.signin_retailer = (req, res) => {
    User.findOne({ email: req.body.email, role: req.body.role })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'retailer') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, email, contactNumber, role, shop_name, gstin } = user;
                    res.status(200).json({
                        token,
                        user: { _id, email, contactNumber, role, shop_name, gstin }
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    })
                }
            } else {
                return res.status(400).json({ message: 'Something went wrong' });
            }
        });
}

exports.signin_seller = (req, res) => {
    User.findOne({ email: req.body.email, role: req.body.role })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'seller') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, email, contactNumber, role, shop_name, gstin } = user;
                    res.status(200).json({
                        token,
                        user: { _id, email, contactNumber, role, shop_name, gstin }
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    })
                }
            } else {
                return res.status(400).json({ message: 'Something went wrong' });
            }
        });
}

exports.getRetailer = (req, res) => {
    User.find({ "role": "retailer" })
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.getSeller = (req, res) => {
    User.find({ "role": "seller" })
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
}
exports.getUserById = (req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error' +err))
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateRetailer = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.contactNumber = req.body.contactNumber;
            user.shop_name = req.body.shop_name;
            user.gstin = req.body.gstin;
            user.role = "retailer";
            user.save()
                .then(() => res.json('Retailer updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateSeller = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.contactNumber = req.body.contactNumber;
            user.shop_name = req.body.shop_name;
            user.gstin = req.body.gstin;
            user.role = "seller";
            user.save()
                .then(() => res.json('Seller updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}
