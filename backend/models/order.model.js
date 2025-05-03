const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: { type: String, require: true },
    productName: { type: String, require: true },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    quantity: { type: Number, require: true },
    productImageUrl: { type: String, require: true },
    address: { type: Object, require: true },
    userId: { type: String, require: true },
    paymentMethod: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
