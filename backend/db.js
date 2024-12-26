const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/merndb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error in connection with MongoDB ", err.message);
  });

mongoose.connection.on("error", (err) => {
  console.log("Runtime error upon connecting to MongoDB ", err.message);
});

module.exports = mongoose;
