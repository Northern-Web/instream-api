const express = require('express');
const authJwt = require("./../middleware/authJwt");

const loanPaymentController = require("./../controllers/loanPayment.controller");
const router = express.Router();

router.post("/", authJwt.verifyToken, loanPaymentController.create);
router.get("/", authJwt.verifyToken, loanPaymentController.find);
router.patch("/:id", authJwt.verifyToken, loanPaymentController.patch);
router.delete("/:id", authJwt.verifyToken, loanPaymentController.delete);

module.exports = router;
