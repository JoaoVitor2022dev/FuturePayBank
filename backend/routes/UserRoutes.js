const express = require("express");
const router = express.Router();

// controllers
const { register } = require("../controllers/UserController");

// for error checking, and validate next action 
const  validate  = require("../middlewares/handleValidation");

// validation`s User 
const { userCreateValidation } = require("../middlewares/userValidation");

// routes
router.post("/register", userCreateValidation(), validate, register); 

module.exports = router; 
