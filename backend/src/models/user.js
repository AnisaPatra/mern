const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    shop_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    gstin: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {        
        type: String,
        enum: ['Retailer','Seller'],
        required: true
    },
    contactNumber: { 
        type: String,
        validate: /^[789]\d{9}$/,
        required: true,
        unique: true
     },
    pofilePicture: { type: String }
}, 
{ timestamps: true }

);


userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
});

userSchema.methods = {
    authenticate: async function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);