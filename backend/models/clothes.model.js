const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema(
  {
    productId: { type: String, require: true },
    productName: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    size: [{ type: String }],
    rating: { type: Number, min: 0, max: 5, require: true },
    returnTime: { type: Number, require: true },
    isPayOnDeliveryAvailable: { type: Boolean },
    isFreeDeliveryAvailable: { type: Boolean },
    isPaymentSecure: { type: Boolean },
    description: { type: String, require: true },
    productImageUrl: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clothes", clothesSchema);
