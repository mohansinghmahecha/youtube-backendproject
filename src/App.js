require("dotenv").config(); // For .env file
const express = require("express");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscribers"); // Model of subscribers

const app = express(); // Ready to use express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB using the direct connection string
mongoose.connect("mongodb+srv://mohansinghmahecha2000:uRyluGTuCIQXjefE@cluster0.ue1ll.mongodb.net/youtube-backend", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes Default
app.get("/", (req, res) => {
  res.redirect("/subscribers");
});

/* List with an array of subscribers with all details */
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Two fields: name and subscribedChannel
app.get("/subscribers/names", async (req, res) => {
  try {
    // Use projection to include only the `name` and `subscribedChannel` fields
    const customizedList = await Subscriber.find({}, 'name subscribedChannel');
    res.json(customizedList);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching subscribers." });
  }
});

// Response with a subscriber (an object) with the given id
app.get("/subscribers/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: "No subscriber found with the given ID" });
    }
    res.json(subscriber);
  } catch (error) {
    res.status(400).json({ message: error.message, statuscode: 400 });
  }
});

// Export the app for use in index.js
module.exports = app;
