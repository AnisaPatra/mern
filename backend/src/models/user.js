const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
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
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        lowercase: true
    },
    gstin: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {        
        type: String,
        enum: ['retailer','seller'],
        required: true
    },
    contactNumber: { 
        type: String, 
        min: 10, 
        max: 13,
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