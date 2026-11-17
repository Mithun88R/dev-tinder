const express = require("express");
const { connectDB } = require("./config/database");
const userModel = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Pranav",
    lastName: "M",
    emailId: "pranavm@gmail.com",
    password: "12345678",
  };

  // creating a new instance of  an user Model
  const user = new userModel(userObj);
  try {
    await user.save();
    res.send("User Signed up successfully");
  } catch (err) {
    res.status(400).send("Error message send to user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DataBase Connected Successfully");
    app.listen(5555, () => {
      console.log("Server is running successfully in port 5555");
    });
  })
  .catch((err) => {
    console.error("DataBase Cannot be connected");
  });
