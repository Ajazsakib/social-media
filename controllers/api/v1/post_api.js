const Post = require("../../../models/Post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .populate({ path: "comments", populate: { path: "user" } });

  return res.status(200).json({
    message: "Lists Of Posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user.toString() == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      return res.status(200).json({
        message: "Post and associated comments deleted successfully",
      });
    } else {
      return res.status(401).json({
        message: "You can not delete this post!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
