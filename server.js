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
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// CONFIG
var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spacescraperdb";

mongoose.connect(MONGODB_URI);

// ROUTES

// GET route to scrape News from spacenews.com
// https://spacenews.com/segment/news/
app.get("/scrape", function(req, res) {
  axios.get("https://spacenews.com/segment/news/").then(function(response) {
    // console.log(response);
    // console.log(response.data);
    var $ = cheerio.load(response.data);
    // console.log($);

    $(".launch-article").each(function(i, element) {
      // console.log(element);

      // "result" is an object to store article data
      var result = {};

      var title = $('.launch-title').children("a").text();
      // var title = $(this).children("a").text();
      console.log(title + "\n");
      // console.log($(this).children("h2").text());

    }); // end cheerio.each
  }); // end axios.get.then
}); // end app.get

// SERVER
app.listen(PORT, function() {
  console.log("Listening for space being scraped on PORT " + PORT + "!");
});
