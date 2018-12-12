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

      // .push() each filled article object into the results Array
      results.push(article);

      // console.log(article);
      // console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n");

      // ==============================

      // use mongoose model Article to .create() a new document in "articles" collection
      db.Article.create(article)
        .then(function(dbArticle) {
          console.log(dbArticle);
          console.log("\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n");
        })
        .catch(function(err) {
          console.log(err);
        });
      // end Article.create
    }); // end cheerio.each

    // send the "results" Array to the browers as JSON for "/scrape"
    res.json(results);
  }); // end axios.get.then
}); // end app.get



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
