// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// public/js/main.js
// ====================================================

// start jQuery wrapper function
$(document).ready(function() {
  // ==========================================================

  // get and set values of all comments username as local storage username value
  let loggedinName = JSON.parse(localStorage.getItem("username"));
  $(".username-input").val(loggedinName);

  // ==========================================================

  // signs a user into page with a username
  $("#signin").on("click", function() {
    let enteredName = $("#signin-name")
      .val()
      .trim();
    // console.log(enteredName);

    // make sure entered username isn't blank
    if (enteredName === "") {
      alert("Please enter a username.");
    } else {
      // set the entered username in localStorage
      localStorage.setItem("username", JSON.stringify(enteredName));

      // this value needs to be set with Handlebars data
      // otherwise hardcoded value replaces this value on page reload
      // $("#users-name").text(loggedinName);
    }
  });

  // ==========================================================

  // on page load, scrape new images
  function scrapeNewNews() {
    $.get("/scrape").then(function(result) {
      console.log(result);
    });
  }
  scrapeNewNews();

  // ==========================================================

  // by default, hide all comment form areas on page load
  $(".comment-form").hide();

  // show/hide (toggle) the comment form areas when .toggle-comment clicked
  $(".toggle-comment").on("click", function(event) {
    // prevent the default page reload behavior
    event.preventDefault();

    // get the article _id from data-id of the button clicked
    let articleId = $(this).attr("data-article");
    // console.log(articleId);

    // and target the comment form with a matching data-id
    let thisCommentForm = $("form[data-article='" + articleId + "']");
    // console.log(thisCommentForm);

    // and toggle visibility of that comment form with a matching data-id
    thisCommentForm.toggle();
  });

  // ==========================================================

  // submit comment to db when clicking add-comment button
  $(".add-comment").on("click", function(event) {
    // prevent the default page reload behavior
    event.preventDefault();

    // get the article _id from data-id of the button clicked
    let thisArticleId = $(this).attr("data-article");
    // console.log(articleId);

    // and target the username-input with a matching data-id
    let thisUsername = $(".username-input[data-article='" + thisArticleId + "']")
      .val()
      .trim();
    // console.log(thisUsername);

    // and target the comment-input with a matching data-id
    let thisUserComment = $(".comment-input[data-article='" + thisArticleId + "']")
      .val()
      .trim();
    // console.log(thisUserComment);

    let userNameAndComment = {
      username: thisUsername,
      commentText: thisUserComment,
      articleId: thisArticleId
    };
    console.log(userNameAndComment);

    // POST the new comment with username to apiRoutes
    $.post("/api/comments/" + thisArticleId, {
      type: "POST",
      data: userNameAndComment
    }).then(function(result) {
      console.log(result);
      // location.reload();
    });

    // empty out the username and comment input fields after POST
    $(".username-input[data-article='" + thisArticleId + "']").val("");
    $(".comment-input[data-article='" + thisArticleId + "']").val("");
    $(".comment-form[data-article='" + thisArticleId + "']").hide();

    location.reload();
  });

  // ==========================================================
}); // end jQuery wrapper
