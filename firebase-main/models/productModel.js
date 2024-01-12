const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    imageCover: {
        type: String,
        // required: [true, 'Product Image cover is required'],
      },
      images: [String]
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Product', productSchema);