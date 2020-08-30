const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const db_url = "mongodb://localhost:27017/test_db";
const PORT = 4000;

const RouteManager = require("./routes");
const app = express();

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", function () {
  console.log("Connected to database successfully.");
});
mongoose.connection.on("error", function (err) {
  console.log("Database error:" + " " + err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", RouteManager);

app.listen(PORT, function (req, res) {
  console.log(`server runing at: http://localhost:${PORT}`);
});

module.exports = app;
