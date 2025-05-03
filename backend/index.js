const { initializeDatabase } = require("./db/db.connection");
const express = require("express");
const cors = require("cors");
const Clothes = require("./models/clothes.model");
const Cart = require("./models/cart.model");
const Wishlist = require("./models/wishlist.model");
const Users = require("./models/user.model");
const Address = require("./models/address.model");
const Order = require("./models/order.model");

const app = express();
app.use(express.json());

initializeDatabase();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/clothes", async (req, res) => {
  try {
    const allClothes = await Clothes.find();
    if (allClothes.length != 0) {
      res.status(200).json(allClothes);
    } else {
      res.status(404).json({ error: "Clothes not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/clothes", async (req, res) => {
  const cloth = req.body;
  try {
    const clothData = new Clothes(cloth);
    await clothData.save();
    res.status(201).json(clothData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/cart", async (req, res) => {
  const cart = req.body;
  try {
    const cartData = new Cart(cart);
    await cartData.save();
    res.status(201).json(cartData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/cart", async (req, res) => {
  try {
    const allClothesInCart = await Cart.find();
    if (allClothesInCart.length != 0) {
      res.status(200).json(allClothesInCart);
    } else {
      res.status(404).json({ error: "Clothes not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.delete("/cart/:clothId", async (req, res) => {
  const clothId = req.params.clothId;
  try {
    let deletedProduct;
    if (clothId === "all") {
      deletedProduct = await Cart.deleteMany({});
    } else {
      deletedProduct = await Cart.findOneAndDelete({
        productId: clothId,
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cart/quantityUpdate", async (req, res) => {
  const { clothId, newQuantity } = req.body;
  if (!clothId || newQuantity <= 0) {
    return res.status(400).json({ message: "Invalid input data." });
  }
  try {
    const updatedProduct = await Cart.findOneAndUpdate(
      { productId: clothId },
      { quantity: newQuantity },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    const allClothesInWishlist = await Wishlist.find();
    if (allClothesInWishlist.length != 0) {
      res.status(200).json(allClothesInWishlist);
    } else {
      res.status(404).json({ error: "Clothes not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/wishlist", async (req, res) => {
  const newWishlist = req.body;
  try {
    const wishlistData = new Wishlist(newWishlist);
    await wishlistData.save();
    res.status(201).json(wishlistData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
app.delete("/wishlist/:clothId", async (req, res) => {
  const clothId = req.params.clothId;
  try {
    const deletedProduct = await Wishlist.findOneAndDelete({
      productId: clothId,
    });
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const allUsers = await Users.find();
    if (allUsers.length != 0) {
      res.status(200).json(allUsers);
    } else {
      res.status(404).json({ error: "Users not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/users", async (req, res) => {
  const user = req.body;
  try {
    const userData = new Users(user);
    await userData.save();
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.delete("/users/:userId", async (req, res) => {
  const userIdToDelete = req.params.userId;
  try {
    const deletedUser = await Users.findByIdAndDelete(userIdToDelete);
    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users/update/:id", async (req, res) => {
  const userId = req.params.id;
  const dataToUpdate = req.body;
  try {
    const updatedUser = await Users.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.get("/address/:userId", async (req, res) => {
  const uId = req.params.userId;
  try {
    const allAddress = await Address.find({ userId: uId });
    if (allAddress.length != 0) {
      res.status(200).json(allAddress);
    } else {
      res.status(404).json({ error: "Address not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/address", async (req, res) => {
  const address = req.body;
  try {
    const addressData = new Address(address);
    await addressData.save();
    res.status(201).json(addressData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.delete("/address/:addressId", async (req, res) => {
  const addressIdToDelete = req.params.addressId;
  try {
    const deletedAddress = await Address.findByIdAndDelete(addressIdToDelete);
    if (!deletedAddress) {
      return res
        .status(404)
        .json({ error: "Address not found or already deleted." });
    }
    res.status(200).json({
      message: "Address deleted successfully",
      address: deletedAddress,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/address/users/:userId", async (req, res) => {
  const addressIdToDelete = req.params.userId;
  try {
    const deletedAddresses = await Address.deleteMany({
      userId: addressIdToDelete,
    });
    if (deletedAddresses.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "No addresses found for this user." });
    }
    res.status(200).json({
      message: "Address deleted successfully",
      address: deletedAddresses,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/address/update/:id", async (req, res) => {
  const addressId = req.params.id;
  const dataToUpdate = req.body;
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      dataToUpdate,
      {
        new: true,
      }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

app.post("/orders", async (req, res) => {
  const data = req.body;
  try {
    let savedData;
    if (Array.isArray(data)) {
      savedData = await Order.insertMany(data);
    } else {
      const orderData = new Order(data);
      savedData = await orderData.save();
    }
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/orders/:userId", async (req, res) => {
  const uId = req.params.userId;
  try {
    const allOrders = await Order.find({ userId: uId });
    if (allOrders.length != 0) {
      res.status(200).json(allOrders);
    } else {
      res.status(404).json({ error: "Orders not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.delete("/orders/:orderId", async (req, res) => {
  const orderIdToDelete = req.params.orderId;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderIdToDelete);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
