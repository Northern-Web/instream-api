const express = require('express');
const authJwt = require("./../middleware/authJwt");

const loanController = require("./../controllers/loan.controller");
const router = express.Router();

router.post("/", authJwt.verifyToken, loanController.create);
router.get("/", authJwt.verifyToken, loanController.find);
router.patch("/:id", authJwt.verifyToken, loanController.patch);
router.delete("/:id", authJwt.verifyToken, loanController.delete);

module.exports = router;
