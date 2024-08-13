// connect and start server
const mongoose = require("mongoose");
require("dotenv").config();
const Subscriber = require("./models/subscribers"); // Import the model
const datafile = require("./data"); // Import the data given by the almabetter

const DATABASE_URL = "mongodb://localhost:27017/you";

// Connect to MongoDB and create database
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to database");

    try {
      // Clear first all
      await Subscriber.deleteMany({});
      console.log("old data is cleaned ");
      // Insert new data and add to MongoDb
      await Subscriber.insertMany(datafile);
      console.log("Data successfully inserted");

      // Close connection after operations performed
      await mongoose.connection.close();
      process.exit(0); // Exit the process after closing the connection
    } catch (err) {
      console.error("Error during data operations:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    // if anything goes wrong
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
