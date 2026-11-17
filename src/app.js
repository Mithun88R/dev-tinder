const express = require("express");
const { connectDB } = require("./config/database");
const userModel = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating a new instance of  an user Model
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send("User Signed up successfully");
  } catch (err) {
    res.status(400).send("Error message send to user" + err.message);
  }
});

app.get("/getallusers", async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(401).send("Couldnt find user" + err.message);
  }
});

app.get("/user", async (req, res) => {
  cons;
  const userEmail = req.body.emailId;
  console.log(userEmail);
  try {
    const user = await userModel.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(401).send("Couldnt find user");
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await userModel.findOneAndUpdate({ _id: data.userId }, data, {
      runValidators: true,
    });
    res.send("Data updated successfully");
  } catch (err) {
    res.status(401).send("Something Went Wrong" + err);
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
