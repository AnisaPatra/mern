const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        enum: ['anipatra2000@gmail.com']
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    contactNumber: { type: String, min: 10, max: 13 },
    pofilePicture: { type: String }
}, 
{ timestamps: true }

);

adminSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
});

adminSchema.methods = {
    authenticate: async function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('Admin', adminSchema);