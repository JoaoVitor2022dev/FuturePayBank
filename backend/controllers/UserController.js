const User = require("../models/User");

// controller configuration 
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

// security variable
const jwtSecret = process.env.JWT_SECRET; 

// create token 
const geretorToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: "7d"}); 
};


const register = async (req, res) => {
  res.send("register")
}

module.exports = { 
    register,
}