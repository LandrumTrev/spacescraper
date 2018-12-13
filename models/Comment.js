// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// models/Comment.js - mongoose Model for User Comments on Articles
// ====================================================

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
  commentText: {
    type: String,
    required: true
  },
  commentCreated: {
    type: Date,
    default: Date.now
  },
  articleId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

let Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
