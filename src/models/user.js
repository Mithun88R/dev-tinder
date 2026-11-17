const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, trim: true },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    city: { type: String },
    gender: {
      type: String,
      validate: function (value) {
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
    },
    isActive: { type: Boolean, default: true },
    skills: { type: [String] },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
