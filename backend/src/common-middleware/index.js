const jwt = require('jsonwebtoken');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "_" + file.originalname);
    },
  });

exports.upload = multer({ storage });

exports.requireSignin = (req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    }
    else{
        return res.status(400).json({message : "Authorization required"});
    }
   
    next();
    
}

exports.adminMiddleware = (req,res,next) =>{
    if(req.user.role != "admin"){
        return res.status(400).json({message : "Admin access Denied"})
    }
    next();
}

exports.adminorsellerMiddleware = (req,res,next) =>{
    if(req.user.role != "Seller"){
        return res.status(400).json({message : "Access Denied"})
    }
    next();
}

exports.adminorreatilerMiddleware = (req,res,next) =>{
    if(req.user.role != "Retailer"){
        return res.status(400).json({message : "Access Denied"})
    }
    next();
}