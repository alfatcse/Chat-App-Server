const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.DB;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
try {
  mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected here")
  );
} catch (e) {
  console.log("could not connect");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
module.exports = dbConnection;
