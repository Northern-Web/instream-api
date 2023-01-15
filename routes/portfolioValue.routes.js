const express = require('express');
const authJwt = require("./../middleware/authJwt");

const portfolioValueController = require("./../controllers/portfolioValue.controller");
const router = express.Router();

router.post("/", authJwt.verifyToken, portfolioValueController.create);
router.get("/", authJwt.verifyToken, portfolioValueController.find);
router.patch("/:id", authJwt.verifyToken, portfolioValueController.patch);
router.delete("/:id", authJwt.verifyToken, portfolioValueController.delete);

module.exports = router;
