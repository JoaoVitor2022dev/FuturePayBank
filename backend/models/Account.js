const mongoose = require("mongoose");
const { Schema } = mongoose; 

const AccountSchema = new Schema({
     Accountname: String,
     username: String,
     accountBalance: Number,
     userId: Object.userId,
     userName: String,
},
{
    timestamps: true,
}
);

Account = mongoose.model("account", AccountSchema); 

module.exports = Account