// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// server.js - settings for the Express web server
// ====================================================

// DEPENDENCIES
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

// Express CONFIG
let PORT = process.env.PORT || 3000;
let app = express();

// Express MIDDLEWARE
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Mongoose CONFIG
// will use db if exists, or will create db if does not exist
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spacescraperdb";

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// Handlebars CONFIG
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// ROUTES
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// SERVER
app.listen(PORT, function() {
  console.log("\n");
  console.log("Listening for space being scraped on PORT " + PORT + "!");
  console.log("\n");
});