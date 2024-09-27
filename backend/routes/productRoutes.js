const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/products', async (req, res) => {
  
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/products/:productName', async (req, res) => {
  try {
    const productName = req.params.productName;
    console.log(productName)
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
