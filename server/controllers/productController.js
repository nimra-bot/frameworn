const Product = require('../models/Product');

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: err.message
    });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch product',
      error: err.message
    });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: 'Failed to create product',
      error: err.message
    });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({
      message: 'Failed to update product',
      error: err.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
};