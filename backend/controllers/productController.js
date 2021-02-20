const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

/**
 * @method GET get all the products
 * @route  GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/**
 * @method GET get single products
 * @route  GET /api/products/:id
 * @access Public
 */
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports = { getProducts, getProductsById };
