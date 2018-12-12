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
let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");

// CONFIG
let db = require("./models");
let PORT = 3000;
let app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/spacescraperdb";

mongoose.connect(MONGODB_URI);

// ROUTES

// GET route to scrape News from spacenews.com
// https://spacenews.com/segment/news/
app.get("/scrape", function(req, res) {
  axios.get("https://spacenews.com/segment/news/").then(function(response) {
    // console.log(response);
    // console.log(response.data);
    let $ = cheerio.load(response.data);
    // console.log($);

    // An empty array to save the data that we'll scrape
    let results = [];

    $(".launch-article").each(function(i, element) {
      // console.log(element);

      const article = {};

      article.link = $(element)
        .find(".launch-title")
        .find("a")
        .attr("href");
      // console.log(article.link + "\n");

      article.title = $(element)
        .find(".launch-title")
        .find("a")
        .text();
      // console.log(article.title + "\n");

      article.author = $(element)
        .find(".author")
        .text();
      // console.log(article.author + "\n");

      article.authorLink = $(element)
        .find(".author")
        .attr("href");
      // console.log(article.authorLink + "\n");

      article.pubDate = $(element)
        .find(".pubdate")
        .attr("datetime");
      // console.log(article.pubDate + "\n");

      article.excerpt = $(element)
        .find(".post-excerpt")
        .text();
      // console.log(article.excerpt + "\n");

      article.thumbnail = $(element)
        .find(".wp-post-image")
        .attr("src");
      // console.log(article.thumbnail + "\n");

      // .push() each filled article object into the results Array
      results.push(article);

      console.log(article);
      console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n");
    }); // end cheerio.each
  }); // end axios.get.then
}); // end app.get

// SERVER
app.listen(PORT, function() {
  console.log("Listening for space being scraped on PORT " + PORT + "!");
});
