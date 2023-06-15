const express = require("express");
const router = express.Router();

// controller 
const {createAccount } = require("../controllers/AccountController");

// middlewares
const { accountCreateValidation } = require("../middlewares/accountValidation");

// for error checking, and validate next action 
const validate = require("../middlewares/handleValidation");

// auth 
const authGuard = require("../middlewares/authGuard");

// router 
router.post("/createaccount", authGuard, accountCreateValidation(), validate, createAccount);


module.exports = router;






