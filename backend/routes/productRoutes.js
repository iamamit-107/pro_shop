const {
  getProducts,
  getProductsById,
} = require("../controllers/productController");
const router = require("express").Router();

// ROUTES
router.route("/").get(getProducts);
router.route("/:id").get(getProductsById);

module.exports = router;
