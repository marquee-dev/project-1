// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/checkout', authenticateUser, async (req, res) => {
  const { shippingAddress, paymentDetails, cartItems } = req.body;
  const userId = req.user._id;

  try {
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);

    // Create a new order
    const newOrder = new Order({
      userId,
      items: cartItems,
      shippingAddress,
      paymentDetails,
      totalPrice,
    });

    await newOrder.save();

    // Clear the cart after checkout
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Error during checkout' });
  }
});

module.exports = router;
