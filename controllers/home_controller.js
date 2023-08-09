const Post = require("../models/Post");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // // change usr value from cookie
  // res.cookie("user_id", 25);

  // populate the user of each post
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec()
    .then(function (post) {
      return res.render("home", {
        title: "Social Media App",
        posts: post,
      });
    })
    .catch(function (err) {
      console.log("Error finding posts");
    });
};
