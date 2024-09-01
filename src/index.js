const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../App"); // importing our full of response file


/* if you are in local machine you can change the "DATABASE_URL " according to your localhostport number in my 
case 
defalut port number of mongoDb is 27017.

const port = is used to view the output into the browser : 3000
*/
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/youtube-backend";
const port = process.env.PORT_DEFAULT || 3000;

console.log("Start entry");

// Connect to MongoDB and start the server
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      // it will show the port number into the console
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    // if anything goes wrong
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose connection disconnected due to application termination"
    );
    process.exit(0);
  });
});
