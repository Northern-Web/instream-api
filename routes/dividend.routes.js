const express = require('express');
const authJwt = require("./../middleware/authJwt");

const dividendController = require("./../controllers/dividend.controller");
const router = express.Router();

router.post("/", authJwt.verifyToken, dividendController.create);
router.get("/", authJwt.verifyToken, dividendController.find);
router.patch("/:id", authJwt.verifyToken, dividendController.patch);
router.delete("/:id", authJwt.verifyToken, dividendController.delete);

module.exports = router;
