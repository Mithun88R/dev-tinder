const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("token :", token);
    if (!token) {
      throw new Error("Invalid Token");
    }
    // console.log("jwt_code", process.env.JWT_SECRET_CODE);
    const decodedObj = await jwt.verify(token, "$devTinder$");

    if (!decodedObj) {
      throw new Error("Not Valid");
    }
    const { _id } = decodedObj;

    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("User not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = { authUser };
