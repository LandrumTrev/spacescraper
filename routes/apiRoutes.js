// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// routes/apiRoutes.js
// ====================================================

// jQuery calls from script.js:

// GET stuff

// POST stuff

// DELETE stuff

// PUT stuff

// require all table data from db as ORM Sequelize models
let db = require("../models");

let axios = require("axios");
let cheerio = require("cheerio");

// export routes for import by server.js, used by Express
module.exports = function(app) {
  // GET route to scrape news page from spacenews.com
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

        // console.log(article + "\n");

        // ==============================

        // then run a function that only inserts a scraped article
        // if it does not already exist in the db
        checkNewArticles(article);

        // ==============================
      });
    });
  });

  // checks if a new article being scraped already exists in "articles" collection
  function checkNewArticles(checkArticle) {
    // console.log(checkArticle);
    // console.log("INCOMING: " + checkArticle.title);

    // // empty array to fill with existing titles from "articles"
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
        // console.log("It's true!");

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

    var comment = req.body.data;
    console.log(comment);

    db.Comment.create(comment)
      .then(function(dbComment) {
        // console.log(dbComment);
        // console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n");
        // console.log("NEW COMMENT ADDED TO DB: " + dbComment);

        // console.log(req.params.articleid);
        // let articleToUpdate = { _id: req.params.articleid };
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
  // ========================================================
  // ========================================================

  // OLD SAMPLE API ROUTES

  // GET ROUTES
  // ========================================================
  // ========================================================

  // // get the Project's projectContent Quill JSON data
  // app.get("/api/projects/:id", function(req, res) {
  //   db.Project.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbProject) {
  //     console.log(dbProject);
  //     res.json(dbProject);
  //   });
  // }); // end app.get

  // ========================================================

  // // get the User's userName and id from the Project's UserId
  // app.get("/api/projects/user/:projectsUserId", function(req, res) {
  //   db.User.findOne({
  //     where: { id: req.params.projectsUserId }
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  // ========================================================
  // ========================================================

  // POST ROUTES
  // ========================================================

  // // create a new Topic in the Project
  // app.post("/api/projects/:project/:topicname", function(req, res) {
  //   // console.log(req.params.project);
  //   // console.log(req.params.topicname);
  //   db.Topic.create({
  //     topicName: req.params.topicname,
  //     ProjectId: req.params.project
  //   }).then(function(dbTopic) {
  //     // console.log(dbTopic);
  //     // redirect
  //     res.redirect("back");
  //   });
  // });

  // ========================================================

  // // create a new Resource in the Topic
  // app.post("/api/resources/:topicid/:resourcename", function(req, res) {
  //   // console.log(req.params.resourcename);
  //   db.Resource.create({
  //     resourceName: req.params.resourcename,
  //     TopicId: req.params.topicid
  //   }).then(function(dbResource) {
  //     // console.log(dbResource);
  //     // redirect
  //     res.redirect("back");
  //   });
  // });

  // ========================================================
  // ========================================================

  // DELETE ROUTES
  // ========================================================

  // // deletes a Topic
  // app.delete("/api/topics/:id", function(req, res) {
  //   db.Topic.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbTopic) {
  //     if (dbTopic.affectedRows == 0) {
  //       // if no rows affected (so, nothing deleted), return 404 (not found)
  //       return res.status(404).end();
  //     } else {
  //       // otherwise (if item was deleted), return 200 (everything good)
  //       res.status(200).end();
  //       res.json(dbTopic);
  //     }
  //   });
  // });

  // ========================================================

  // // deletes a Resource
  // app.delete("/api/resources/:id", function(req, res) {
  //   db.Resource.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbResource) {
  //     if (dbResource.affectedRows == 0) {
  //       // if no rows affected (so, nothing deleted), return 404 (not found)
  //       return res.status(404).end();
  //     } else {
  //       // otherwise (if item was deleted), return 200 (everything good)
  //       res.status(200).end();
  //       res.json(dbResource);
  //     }
  //   });
  // });

  // ========================================================
  // ========================================================

  // UPDATE (PUT) ROUTES
  // ========================================================

  // // updates the Quill wordprocessor Project Content
  // app.put("/api/projects/:id", function(req, res) {
  //   console.log("route request:" + req);
  //   db.Project.update(
  //     {
  //       projectContent: req.body.projectContent
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   )
  //     .then(function(dbProjectContent) {
  //       res.json(dbProjectContent);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // ========================================================

  // // updates a Resource Name
  // app.put("/api/resource-name/:id", function(req, res) {
  //   db.Resource.update(
  //     {
  //       resourceName: req.body.resourceName
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   )
  //     .then(function(dbResourceName) {
  //       res.json(dbResourceName);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // ========================================================

  // // updates Resource Content text
  // app.put("/api/resource-content/:id", function(req, res) {
  //   db.Resource.update(
  //     {
  //       resourceContent: req.body.resourceContent
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   )
  //     .then(function(dbResCont) {
  //       res.json(dbResCont);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // ========================================================

  // // updates a Topic Name
  // app.put("/api/topics/:id", function(req, res) {
  //   db.Topic.update(
  //     {
  //       topicName: req.body.topicName
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       }
  //     }
  //   )
  //     .then(function(dbTopicName) {
  //       res.json(dbTopicName);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // ========================================================
}; // end module.exports
