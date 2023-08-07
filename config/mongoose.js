const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/social_media_app");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting To Mongo DB"));

db.once("open", function () {
  console.log("Connected To Database Mongo DB");
});

module.exports = db;
