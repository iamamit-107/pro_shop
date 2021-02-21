const {
  authUer,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = require("express").Router();

// ROUTES
router.route("/").post(registerUser);
router.route("/login").post(authUer);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
