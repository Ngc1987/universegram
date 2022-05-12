// import multer from ("multer");
// import router from ("express").Router();
// import authController from "../controllers/auth.controller";
// import userController from "../controllers/user.controller";
// import uploadController from "../controllers/upload.controller";

const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();


// Auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// User database
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow)
router.patch("/unfollow/:id", userController.unfollow)

// User messages
router.put("/message/:id", userController.sendMessage);

// Upload routes
router.post("/upload", upload.single("file"), uploadController.uploadProfile)

module.exports = router;