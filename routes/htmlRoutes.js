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

  // =====================================================

  // htmlRoute for getting all Article collection docs from the db
  app.get("/articles", function(req, res) {
    // async mongoose return all documents in "articles" collection
    db.Article.find({})
      // data returned placed into promise func's dbArticle param
      .then(function(dbArticle) {
        // check out the structure of the data returned in dbArticle
        console.log(dbArticle[0]);
        console.log("\n");
        // result renders article.handlebars view
        res.render("articles", {
          // data passed into the Handlebars view render:
          // hardcoded key:value data property
          msg: "Articles...from Space!",
          // data returned from mongoose db query
          articles: dbArticle
        }); // end handlbars render
      }) // end .then()
      .catch(function(err) {
        // if error, send JSON(err) to browser
        // instead of article.handlebars render()
        res.json(err);
      }); // end .catch()
  }); // end app.get()


  // // Route for getting all Articles from the db
  // app.get("/articles", function(req, res) {
  //   // Grab every document in the Articles collection
  //   db.Article.find({})
  //     .then(function(dbArticle) {
  //       // If we were able to successfully find Articles, send them back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

  // =====================================================


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
