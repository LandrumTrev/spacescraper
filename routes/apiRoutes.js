// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// routes/apiRoutes.js
// ====================================================

let db = require("../models");
let axios = require("axios");
let cheerio = require("cheerio");

module.exports = function(app) {
  // GET route to scrape news page from spacenews.com
  // https://spacenews.com/segment/news/
  app.get("/scrape", function(req, res) {
    // have axios scrape a page and return its data as (response)
    axios
      .get("https://spacenews.com/segment/news/")
      .then(function(response) {
        // console.log(response.data);

        // cheerio acts like (and uses) jQuery to traverse axios-scraped data
        let $ = cheerio.load(response.data);

        $(".launch-article").each(function(i, element) {
          // console.log(element);

          // object to hold all properties of a scraped article
          const article = {};

          // tack scraped data onto the article object
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

          // console.log(article + "\n");

          // ==============================

          // then run a function that only inserts a scraped article
          // if it does not already exist in the db
          checkNewArticles(article);
          // ==============================
        });
      })
      .then(function() {
        // console.log(res);
        // console.log("scrape finished");
        res.json("scrape finished");
      });
  });

  // checks if a new article being scraped already exists in "articles" collection
  function checkNewArticles(checkArticle) {
    // console.log(checkArticle);
    // console.log("INCOMING: " + checkArticle.title);

    // empty array to fill with existing titles from "articles"
    let existingTitles = [];

    // get all docs from "articles" collection
    db.Article.find({}).then(function(dbArticle) {
      // for each existing article,
      dbArticle.forEach(art => {
        // push its title into the existingTitles array
        existingTitles.push(art.title);
      });
      // now we have an array of the titles of all existing articles in the db
      // console.log(existingTitles);

      // helper function for existingTitles.every(), below
      // checks .every() existing title to see if it matches an incoming title
      function checkMatch(title) {
        // returns TRUE if an existing title DOES NOT MATCH incoming title
        return title !== checkArticle.title;
      }

      // if ALL existingTitles DO NOT MATCH an incoming title
      if (existingTitles.every(checkMatch) === true) {

        // then .create() a new Article document in "articles" collection
        db.Article.create(checkArticle)
          .then(function(dbArticle) {
            // console.log(dbArticle);
            // console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n");
            console.log("NEW ARTICLE ADDED TO DB: " + dbArticle.title);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        // otherwise let console know the article already exists, do nothing
        console.log("SCRAPED ARTICLE ALREADY EXISTS: " + checkArticle.title);
      }
    });
  }

  // ========================================================

  // POST a new Comment to the db
  app.post("/api/comments/:articleid", function(req, res) {
    // console.log(req.params.articleid);
    // console.log(req.body);

    let comment = req.body.data;
    // console.log(comment);

    db.Comment.create(comment)
      .then(function(dbComment) {
        // console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n");
        // console.log("NEW COMMENT ADDED TO DB: " + dbComment);

        return db.Article.findOneAndUpdate({ _id: req.params.articleid }, { $push: { comments: dbComment._id } }, { new: true });
      })
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  // ========================================================

  // route from a DELETE COMMENT button
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.remove({ _id: req.params.id }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // ========================================================
}; // end module.exports
