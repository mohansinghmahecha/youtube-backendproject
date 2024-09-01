require("dotenv").config(); //for .env file
const express = require("express");

const Subscriber = require("./src/models/subscribers"); // model of subscribers here we described datatypes

const app = express();// ready to use of express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes Default
app.get("/", (req, res) => {
  res.redirect("/subscribers");
});

/* list with an array of subscribers */
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// two fields name and subscribedChannel
app.get("/subscribers/names", async (req, res) => {
  try {
    // Use projection to include only the `name` and `subscribedChannel` fields
    const customizedList = await Subscriber.find({}, 'name subscribedChannel').exec();
    res.json(customizedList);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching subscribers." });
  }
});


// http://localhost:3000/subscribers/:id) Response with a subscriber*(an object)*
app.get("/subscribers/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res
        .status(404)
        .json({ message: "No subscriber found with the given ID" });
    }
    res.json(subscriber);
  } catch (error) {
    res.status(400).json({ message: error.message, statuscode: 400 });
  }
});

// Export the app for use in index.js
module.exports = app;
