const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    Name: String,
    Email: String,
    Phone_No: String,
    phoneOtp:String,
    password: String,
    confirmPassword: String,
    category: String,
    Address: String,
    Pincode: String,
    City: String,
    State: String,
    productId : [
      {
      type: mongoose.Schema.Types.ObjectId
     }
],
    subTotal : {
      type : Number,
      default : 0
  }
  })
);
module.exports = User;
