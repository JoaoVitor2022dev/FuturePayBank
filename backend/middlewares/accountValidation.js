const { body } = require("express-validator");

const accountCreateValidation = () => {
    return [
       body("accountname")
       .isString()
       .withMessage("O nome para a conta é obrigatorio")
       .isLength({ min : 3 })
       .withMessage("O nome da conta deve ter mais de 3 caracteres"),
       body("cpf")
       .isNumeric()
       .withMessage("O CPF é obrigatorio para criar a conta!")
       .isLength({ min: 11 })
       .withMessage("CPF inválido!"),
       body("accountpassword")
       .isString()
       .withMessage("A senha é obrigatorio da sua conta!")
       .isLength({ min: 4 })
       .withMessage("A senha deve ter mais de 4 digito")
    ]; 
}; 

module.exports = { 
    accountCreateValidation
}
