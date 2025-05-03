const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userFirstName: { type: String, require: true },
    userLastName: { type: String, require: true },
    email: { type: String, require: true },
    phoneNumber: { type: Number, require: true },
    password: { type: String, require: true },
    isLoggedIn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
