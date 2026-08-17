const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      phone: String,
    },
    status: { type: String, default: 'placed' }, // placed | shipped | delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
