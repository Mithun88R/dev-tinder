const express = require("express");
const { connectDB } = require("./config/database");
const userModel = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authUser } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    // hashing Password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance of  an user Model
    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Signed up successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid EmailId");
    }
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const tokens = await jwt.sign({ _id: user._id }, "$devTinder$", {
        expiresIn: "1d",
      });

      res.cookie("token", tokens, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfull!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

app.get("/profile", authUser, async (req, res) => {
  try {
    const user = req.user;
    console.log("user : ", user);

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }

  //res.send("cookies check");
});

app.post("/sendConnectionUser", authUser, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " is been connected");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }

  //res.send("cookies check");
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
  try {
    const data = req.body;
    if (data?.skills?.length > 10) {
      throw new Error("Skills length should not be greater than 10");
    }
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
