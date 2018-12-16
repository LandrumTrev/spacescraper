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
let db = require("../models");

// export routes for import by server.js, used by Express
module.exports = function(app) {
  // ====================================================
  // =====================================================

  // htmlRoute for getting all Article collection docs from the db
  // single page app, so ALL routes "*" will call the same function
  app.get("*", function(req, res) {
    // async mongoose return all documents in "articles" collection
    db.Article.find({})
      // limit the number of documents returned
      .limit(10)
      // sort the display order by day in pubDate, then by datetime of articleCreated
      .sort({ pubDate: -1, articleCreated: -1 })
      // populate comments: of each Article with full data of associated Comments
      .populate("comments")
      // data returned placed into promise func's dbArticle param
      .then(function(dbArticle) {
        // check out the structure of the data returned in dbArticle
        // console.log(dbArticle[0]);
        // result renders index.handlebars view
        res.render("index", {
          // data passed into the Handlebars view render returned from mongoose db query
          articles: dbArticle
        }); // end handlbars render
      }) // end .then()
      .catch(function(err) {
        // if error, send JSON(err) to browser
        // instead of article.handlebars render()
        res.json(err);
      }); // end .catch()
  }); // end app.get()

  // ====================================================
}; // end module.exports
