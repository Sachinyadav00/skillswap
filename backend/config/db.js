const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const dbConnection = mongoose.connection;

dbConnection.on("open", () => {
  console.log("Mongodb connected ✅");
});

dbConnection.on("error", () => {
  console.log("Mongodb failed to connect ❌");
});

module.exports = dbConnection;
