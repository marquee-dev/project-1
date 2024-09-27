// In routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticateUser } = require('../middleware/authMiddleware'); // Add authentication middleware

const router = express.Router();

// Add product to cart
// In routes/cartRoutes.js
router.post('/addcart', authenticateUser, async (req, res) => {
  const { productId, quantity, size } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId && item.size === size);
    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error adding product to cart', details: err.message });
  }
});


  
  router.get('/mycart', authenticateUser, async (req, res) => {
    console.log("mycart")
    try {
      const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId'); // Populate product details
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart.items); // Return the items in the cart
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/cart/delete/:productId', authenticateUser, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
      if (itemIndex > -1) {
        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
      } else {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error removing product from cart', details: err.message });
    }
  });
  
module.exports=router