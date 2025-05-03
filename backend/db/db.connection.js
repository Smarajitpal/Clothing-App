const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(MongoUri);
    if (connection) {
      console.log("Connected to database.");
    }
  } catch (error) {
    console.log("Error connecting to database.", error);
  }
};
module.exports = { initializeDatabase };
