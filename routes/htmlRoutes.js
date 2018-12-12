// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// routes/htmlRoutes.js
// ====================================================

// require Mongoose models/index.js to access data from db
// to use for sending data to Handlebars page views
var db = require("../models");

// export routes for import by server.js, used by Express
module.exports = function(app) {
  // ====================================================

  // default demo INDEX route
  // app.get("/", function(req, res) {
  //   res.send("Scraping space with a mongoose!");
  // });

  // root call renders index.handlebars
  app.get("/", function(req, res) {

    res.render("index", {
      msg: "Welcome Intergalactic Mongeese!"
    });

    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load page with user's projects
  // app.get("/:user", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("myprojects", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  // ====================================================
}; // end module.exports
