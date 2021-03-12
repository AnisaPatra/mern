const mongoose = require('mongoose');
const PaymentTypeSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true, 
        trim: true ,
        unique : true
    },
    pic: { 
        img: { type: String } 
    },
    picture: {
        img : { type: String } 
    }
    


}, { timestamps: true });


module.exports = mongoose.model('PaymentOptions', PaymentTypeSchema);