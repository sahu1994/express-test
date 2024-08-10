const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authControllers");

router.route("/signUp").post(authController.signUp);

router.route("/login").post(authController.login);

router.route("/auth/google").post(authController.googleLogin);

module.exports = router;
