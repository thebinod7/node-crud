const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const RouteManager = require("./routes");

const app = express();

const db_url = "mongodb://localhost:27017/test_db";

// Connect to database using mongoose.
mongoose.connect(db_url);
mongoose.connection.on("connected", function () {
  console.log("Connected to database successfully.");
});

mongoose.connection.on("error", function (err) {
  console.log("Database error:" + " " + err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ROUTES FOR OUR APP
app.use("/", RouteManager);

app.listen(4000, function (req, res) {
  console.log("server started at: 4000");
});
