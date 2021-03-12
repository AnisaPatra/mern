const User = require('../../models/admin_auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) return res.status(400).json({
                message: 'Admin already registered'
            });

            const {
                email,
                password,
                contactNumber
            } = req.body;
            const _user = new User({
                email,
                password,
                contactNumber,
                username: Math.random().toString()
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: `Something went wrong, ${error}`
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'Admin created Successfully..!'
                    })
                }
            });
        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                const isPassword = await user.authenticate(req.body.password);
                if (isPassword && user.role == "admin") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    const { _id, email, role, contactNumber } = user;
                    res.cookie("token", token, { expiresIn: "1d" });
                    res.status(200).json({
                        token,
                        user: { _id, email, role, contactNumber }
                    });
                } else {
                    return res.status(400).json({
                        message: "Invalid Password / EmailId",
                    });
                }

            } else {
                return res.status(400).json({ message: 'Something went wrong' });
            }
        });
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};