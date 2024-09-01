const mongoose = require("mongoose");
require("dotenv").config();
const serverless = require("serverless-http");
const app = require("./App"); // Update the path if necessary

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mongodb+srv://mohansinghmahecha2000:uRyluGTuCIQXjefE@cluster0.ue1ll.mongodb.net/youtube-backend";

// Set up a handler for Netlify functions
const handler = serverless(app);

// Connect to MongoDB and export the handler
const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
};

connectDb();

module.exports.handler = async (event, context) => {
  return handler(event, context);
};

// Graceful shutdown for local testing (not needed in Netlify but good for local dev)
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose connection disconnected due to application termination"
    );
    process.exit(0);
  });
});
