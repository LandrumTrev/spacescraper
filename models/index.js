// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// models/index.js - collect and export all mongoose Models in /models dir
// ====================================================

// Export an object containing all mongoose Models in /models dir

module.exports = {
  Article: require("./Article"),
  Comment: require("./Comment"),
  User: require("./User")
};
