const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique : true,
        maxlength:40,
        minlength:3
      },
      slug: {
        type: String,
        unique: true,
      },
      CategoryImage: { type: String },
      parentCategory: {
        type: String,
        maxlength:40,
        minlength:3
      }

}, { timestamps: true });


module.exports = mongoose.model('Category', categorySchema);