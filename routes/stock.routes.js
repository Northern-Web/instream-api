const express     = require('express');
const authJwt = require("./../middleware/authJwt");

const stockController = require("./../controllers/stock.controller");
const router = express.Router();

router.post("/", authJwt.verifyToken, stockController.create);
router.get("/", authJwt.verifyToken, stockController.get);
router.patch("/:id", authJwt.verifyToken, stockController.patch);
router.delete("/:id", authJwt.verifyToken, stockController.delete);

module.exports = router;
