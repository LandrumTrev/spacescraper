// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// server.js - settings for the Express web server
// ====================================================

// Exporting an object containing all of our models

module.exports = {
  Article: require("./Article"),
  Comment: require("./Comment")
};
