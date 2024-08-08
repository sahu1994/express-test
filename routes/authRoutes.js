const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authControllers");

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);

module.exports = router;