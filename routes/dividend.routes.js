const express = require('express');
const authJwt = require("./../middleware/authJwt");

const dividendController = require("./../controllers/dividend.controller");
const router = express.Router();

router.post("/", authJwt.verifyToken, dividendController.create);
//router.get("/", authJwt.verifyToken, stockController.get);

module.exports = router;
