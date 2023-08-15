const Post = require("../models/Post");
const Comment = require("../models/comment");
module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then(function (post) {
      console.log("Post Created");
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post: post,
          },
          message: "Post Created",
        });
      }
      return res.redirect("back");
    })
    .catch(function (err) {
      console.log("Error in creating user");
    });
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id).then(function (post) {
    if (post.user == req.user.id) {
      post.deleteOne();

      Comment.deleteMany({ post: req.params.id }).then(function (comment) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
