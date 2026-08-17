require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  
  
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true }, // URL
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
