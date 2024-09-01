// connect and start server
const mongoose = require("mongoose"); //mongoose liabrary used 
require("dotenv").config(); // for env file
const Subscriber = require("./models/subscribers"); // Import the model file
const datafile = require("./data"); // Import the data given by the almabetter

/* change url if you are using for the local machine */
// const DATABASE_URL = "mongodb://localhost:27017/youtube-backend";


/* This is mongo atlus url which allowing us to directly access using clouc  */
const DATABASE_URL =
  "mongodb+srv://mohansinghmahecha2000:uRyluGTuCIQXjefE@cluster0.ue1ll.mongodb.net/youtube-backend";




// Connect to MongoDB and create database
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to database");

    try {
      //first Clear  all
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
    // if anything goes wrong it will show us error into console 
    console.error("Error connecting to database:", err);
    process.exit(1);
  });
