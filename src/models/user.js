const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: { type: String, maxLength: 20, trim: true },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not Strong " + value);
        }
      },
    },
    city: { type: String, trim: true, maxLength: 30 },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      },
    },
    age: { type: Number, min: 5, max: 100 },
    phoneNumber: { type: String },
    userImage: {
      type: String,
      default:
        "https://www.reading.ac.uk/agri-food-economics-marketing/-/media/project/uor-main/schools-departments/agri-food-economics-and-marketing/staff/staff-profile-placeholder.jpg",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid User Image Url:  " + value);
        }
      },
    },
    isActive: { type: Boolean, default: true },
    skills: { type: [String] },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
