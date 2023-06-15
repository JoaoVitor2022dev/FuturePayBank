const mongoose = require("mongoose");
const { Schema } = mongoose; 

const AccountSchema = new Schema({
     Accountname: String,
     accountBalance: Number,
     userId: mongoose.ObjectId,
     userName: String,
     cpf: Number,
     accountpassword: String,
},
{
    timestamps: true,
}
);

Account = mongoose.model("account", AccountSchema); 

module.exports = Account