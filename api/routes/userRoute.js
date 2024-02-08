const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

// User registration route
router.post("/register", userController.register);

// User login route
router.post("/login", userController.login);

// User me route
router.get("/me", userController.me);

module.exports = router;
