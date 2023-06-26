const Transaction = require("../models/Transaction");
const user = require("../models/User");
const Account = require("../models/Account");

// 1 - trasnferir  

const transitionAmount = async (req, res) => {
    
    // destino
    const reqUser = req.user; 

    // destinatario
    const { cpfreceiver, amount } = req.body; 

    const accountUser = await Account.findOne({ userId: reqUser._id });

    // cpf existe 
    const accountAddressee = await Account.findOne({ cpf:cpfreceiver}); 

    if (!accountAddressee) {
        res.status(401).json({ errors: ["O destinatário nao tem conta no nosso banco!"] }); 
        return
    }

    if (cpfreceiver === accountUser._id) {
        res.status(401).json({ errors: ["Voce nao pode trasnferir para sua propria conta."]})
        return
    }

    // checkar o valor da conta do destino 

    if ( amount > accountUser.accountBalance ) {
        res.status(401).json({ errors: ["O valor nao existe em sua conta"] }); 
        return
    }

    // o valor de trasnferir tem  /  do matheus para a tayane

    accountUser.accountBalance =  accountUser.accountBalance - amount ;

    accountAddressee.accountBalance = amount + accountAddressee.accountBalance; 

    accountUser.save(); 
    accountAddressee.save(); 

    // aviso de trasnferencia 

    res.status(201).json({ accountUser: accountUser, accountAddressee: accountAddressee,  message: ["Transferencia concluida com sucesso!"] });

}; 


// 2 - aviso de trasnferencia 

// accont tasndicionAccont :  [] 


module.exports = {
    transitionAmount
}