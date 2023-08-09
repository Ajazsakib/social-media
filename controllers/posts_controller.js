const Post = require("../models/Post");

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(function (user) {
      console.log("User Creates");
      return res.redirect("back");
    })
    .catch(function (err) {
      console.log("Error in creating user");
    });
};
