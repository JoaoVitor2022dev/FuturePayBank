const express = require("express");
const router = express.Router();

// controllers
const { register, login, getUserCurrent } = require("../controllers/UserController");

// for error checking, and validate next action 
const  validate  = require("../middlewares/handleValidation");

// validation`s User 
const { userCreateValidation, userLoginValidation } = require("../middlewares/userValidation");

//  validation token 
const authGuard = require("../middlewares/authGuard");

// routes
router.post("/register", userCreateValidation(), validate, register); 
router.post("/login", userLoginValidation(), validate, login ); 
router.get("/profile", authGuard,getUserCurrent );

module.exports = router; 
