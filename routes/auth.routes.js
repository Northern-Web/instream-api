const express = require('express');
const verifySignUp = require("./../middleware/verifySignUp");

const authController = require("./../controllers/auth.controller");
const router = express.Router();

router.post("/signup", verifySignUp.checkDuplicateSignUp, authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
