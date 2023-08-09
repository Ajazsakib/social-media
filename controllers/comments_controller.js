const Comment = require("../models/comment");
const Post = require("../models/Post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post).then(function (post) {
    if (post) {
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      }).then(function (comment) {
        if (comment) {
          post.comments.push(comment);
          post.save();
          res.redirect("/");
        }
      });
    }
  });
};
