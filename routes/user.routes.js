const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");


// Auth
router.post("/register", authController.signUp);

// User database
router.get("/", userController.getAllUsers);

module.exports = router;