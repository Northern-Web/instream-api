const express = require('express');

const stockController = require("./../controllers/stock.controller");
const router = express.Router();

router.post("/", stockController.create);
router.get("/", stockController.get);

module.exports = router;
