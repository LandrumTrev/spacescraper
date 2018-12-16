// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// models/User.js - mongoose Model for User username and password
// ====================================================

// this model not currently used
// future use for more robust user accounts
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
