// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// models/Article.js - mongoose Model for scraped news Article data
// ====================================================

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorLink: {
    type: String,
    required: true
  },
  pubDate: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

let Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
