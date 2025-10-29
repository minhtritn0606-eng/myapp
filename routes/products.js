const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Add product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    const product = new Product({
      name,
      description,
      price,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Search products
router.get('/', async (req, res) => {
  try {
    const { q, tag } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: 'i' };
    if (tag) filter.tags = tag;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
