const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailId: { type: String },
  password: { type: String },
  city: { type: String },
  gender: { type: String },
  age: { type: Number },
  phoneNumber: { type: String },
  userImage: { type: String },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
