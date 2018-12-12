// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// routes/htmlRoutes.js
// ====================================================

// require all table data from db as ORM Sequelize models
var db = require("../models");

// export routes for import by server.js, used by Express
module.exports = function(app) {

  // ====================================================

  // why isn't "/" getting sent this message?
  app.get("/", function(req, res) {
    res.send("Scraping space with a mongoose!");
  });

  // ====================================================
}; // end module.exports
