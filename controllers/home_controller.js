const Post = require("../models/Post");
const User = require("../models/user");
// module.exports.home = function (req, res) {

//   Post.find({})
//     .populate("user")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec()
//     .then(function (post) {
//       User.find({}).then(function (user) {
//         return res.render("home", {
//           title: "Social Media App",
//           posts: post,
//           all_users: user,
//         });
//       });
//     })
//     .catch(function (err) {
//       console.log("Error finding posts");
//     });
// };

// convert code into async await

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({ path: "comments", populate: { path: "user" } });

    let users = await User.find({});

    return res.render("home", {
      title: "Social Media App",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
  }
};
