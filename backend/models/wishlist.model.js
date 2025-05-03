const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    productId: { type: String, require: true },
    productName: { type: String, require: true },
    price: { type: Number, require: true },
    size: { type: String },
    quantity: { type: Number },
    productImageUrl: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
