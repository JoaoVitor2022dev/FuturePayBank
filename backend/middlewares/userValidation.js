const { body } = require("express-validator")

const userCreateValidation = () => { 
    return [
    body("name")
        .isString()
        .withMessage("O nome é obrigatorio")
        .isLength({ min: 3})
        .withMessage("O nome precisa ter no minimo 3 characters"),
    body("email")
        .isString()
        .withMessage("O E-mail é obrigatorio!")
        .isEmail()
        .withMessage("Coloque um E-mail válido"),    
    body("password")
        .isString()
        .withMessage("O nome é obrigatorio")
        .isLength({ min: 5})
        .withMessage("A senha deve ter mais de 5 characters"),
    body("confirmpassword")
        .isString()
        .withMessage("A confirmacão de senha é obrigatoria")
        .custom(( value, { req }) => {
           if (value !=  req.body.password) {
              throw new Error("As senhas não são iguais.")
           } 
           return true;
        })     
    ]
}

const userLoginValidation = () => {
   return [
     body("email")
     .isString()
     .withMessage("O email é obrigatório")
     .isEmail()
     .withMessage("O E-mail tem que válido"), 
     body("password")
     .isString()
     .withMessage("A senha é obrigatória") 
     .isLength({ min: 3 })
     .withMessage("A senha está com menos de 5 caracteres, senha incorreta!")
   ]
}; 

module.exports = {
    userCreateValidation,
    userLoginValidation
}