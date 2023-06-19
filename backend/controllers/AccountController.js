const Account = require("../models/Account");
const User = require("../models/User");
const mongoose = require("mongoose"); 
const bcryptjs = require("bcryptjs");


// Create an account 
const createAccount =  async (req, res) => {
    
    const { accountname, cpf, accountpassword } =  req.body; 
    
    const reqUser = req.user; 
    
    const user = await User.findById(reqUser._id); 

    // check if the user had already created an account 
    const account = await Account.find({ userId: user._id}); 

    // check if user exists
    if (account) {
        res.status(401).json({ errors: ["A conta já existe!"]})
        return; 
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

    // if photo was created successfully, return data 
    if (!newAccount) {
        res.status(422).json({errors:["Houve um problema, por favor tente novamente mais tarde."]});
        return; 
    }    
    res.status(201).json(newAccount);
};

module.exports = { 
    createAccount 
}








