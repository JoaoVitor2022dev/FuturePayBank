const Account = require("../models/Account");
const User = require("../models/User");
const mongoose = require("mongoose"); 
const bcryptjs = require("bcryptjs");


// Create an account 
const createAccount =  async (req, res) => {
    
    const { accountname, cpf, accountpassword } =  req.body; 
    
    const reqUser = req.user; 
    
    const user = await User.findById(reqUser._id); 
 
    // check if the user has an account
    const account = await Account.findOne({ userId: reqUser._id });

    if (account) {
        res.status(401).json({ errors: ["Você já tem conta"] }); 
        return
    }

    // Generate password hash 
    const salt = await bcryptjs.genSalt(); 
    const passwordHash = await bcryptjs.hash( accountpassword, salt);
    
    const newAccount = await Account.create({
        accountname,
        cpf,
        accountpassword: passwordHash,
        userId: user._id, 
        userName: user.name
    })

    if (!newAccount) {
        res.status(422).json({errors:["Houve um problema, por favor tente novamente mais tarde."]});
        return; 
    }    
    res.status(201).json(newAccount);
};

module.exports = { 
    createAccount 
}








