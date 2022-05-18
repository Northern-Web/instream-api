const express = require('express');
const authJwt = require("./../middleware/authJwt");

const userController = require("./../controllers/user.controller");
const router = express.Router();

router.get("/", authJwt.verifyToken, userController.find);
router.patch("/:id", authJwt.verifyToken, userController.patch);
router.delete("/:id", authJwt.verifyToken, userController.delete);

module.exports = router;
