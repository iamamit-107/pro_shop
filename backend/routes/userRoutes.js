const {
  authUer,
  getUserProfile,
  registerUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = require("express").Router();

// ROUTES
router.route("/").post(registerUser);
router.route("/login").post(authUer);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
