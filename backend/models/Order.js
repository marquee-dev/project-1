// models/Order.js
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true }  // Store the size in the order
    }
  ],
  shippingAddress: { type: String, required: true },
  paymentDetails: {
    cardNumber: { type: String, required: true },
    expiry: { type: String, required: true },
    cvv: { type: String, required: true }
  },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
