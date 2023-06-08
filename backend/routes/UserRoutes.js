const express = require("express");
const router = express.Router();

// controllers
const { register, login } = require("../controllers/UserController");

// for error checking, and validate next action 
const  validate  = require("../middlewares/handleValidation");

// validation`s User 
const { userCreateValidation, userLoginValidation } = require("../middlewares/userValidation");

// routes
router.post("/register", userCreateValidation(), validate, register); 
router.post("/login", userLoginValidation(), validate, login )

module.exports = router; 
