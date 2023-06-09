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
 
    const { name, email, password } = req.body; 

    // check if the user email already exists in the database
    const user = await User.findOne({email}); 

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize outra senha"] });
        return
    }
 
    // Gerenate password hash 
    const salt =  await bcryptjs.genSalt(); 
    const passwordHash = await bcryptjs.hash(password, salt);
    
    // create user
   const newUser = await User.create({ 
       name,
       email,
       password: passwordHash
   })
 
   // check if you had any problems in the whole operation 
    if (!newUser) {
        res.status(422).json({ errors: ["Houve um error, por favor tente mais tarde."]}); 
        return 
    }

   // response to front end with generated id and token
   res.status(201).json({ _id: newUser._id, token: geretorToken(newUser._id)}); 
}

// Sing user login

const login = async (req, res) => {
    
    const { email, password } = req.body 

    // check email exist 
    const user = await User.findOne({email: email}) 

    if (!user) {
        res.status(422).json({ errors: ["O email que voce colocou nao existe"] })
    }
    
    // check password
    if (!(await bcryptjs.compare(password, user.password))) {
        res.status(422).json({ errors: ["A senha esta incorreta!"]})
        return
    }
  
    // return user with token 
    res.status(201).json({ _id: user._id, token: geretorToken(user._id)}); 
}

//  get user a token 

const getUserCurrent = async (req, res) => {
    const user = req.user; 
 
    console.log(user);

    res.status(201).json(user)
}; 


module.exports = { 
    register,
    login,
    getUserCurrent
}


