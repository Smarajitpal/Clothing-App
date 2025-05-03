const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    deliveryName: { type: String, require: true },
    mobileNumber: { type: Number, require: true },
    pincode: { type: Number, require: true },
    locality: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    landmark: { type: String },
    altPhoneNumber: { type: Number },
    userId: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
