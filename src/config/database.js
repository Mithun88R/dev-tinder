const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mithundeveloper88_db_user:9l6SfZHaXO14RF34@pranavm.ayq2jlq.mongodb.net/DevTinder",
  );
};

module.exports = { connectDB };
