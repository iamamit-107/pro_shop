const asyncHandler = require("express-async-handler");
const router = require("express").Router();
const Product = require("../models/ProductModel");

/**
 * @method GET get all the products
 * @route  GET /api/products
 * @access Public
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

/**
 * @method GET get single products
 * @route  GET /api/products/:id
 * @access Public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

module.exports = router;
