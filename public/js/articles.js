// ====================================================
// spacescraper :: Scraping news from space with Mongo!
// MVC with Handlebars,  Node, Express, MongoDB, Mongoose, Axios, and Cheerio.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// public/js/articles.js
// ====================================================

// start jQuery wrapper function
$(document).ready(function() {
  // ==========================================================

  // console.log("articles.js logging is go!");

  // ==========================================================
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

  // ==========================================================
}); // end jQuery wrapper

// ==========================================================

// SAMPLE CODE

// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
