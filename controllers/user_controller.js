const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  User.findById(req.params.id).then(function (user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
  //     return res.redirect("/");
  //   });
  // } else {
  //   return res.status(401).send("UnAuthorized");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*******multer Error:", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          // this is saving the path of the uploaded file into the avatar field in the user
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      return res.rediect("back");
    }
  } else {
    return res.status(401).send("UnAuthorized");
  }
};
// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Social Media || Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Social Media || SignIn",
  });
};

// render page after create user

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }).then(function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
    }

    if (!user) {
      User.create(req.body)
        .then(function (user) {
          if (user) {
            return res.redirect("/users/sign-in");
          }
        })
        .catch(function (err) {
          console.log("Error in Creating User");
        });
    } else {
      return res.redirect("back");
    }
  });
};

// signin and create a session for user

module.exports.createSession = function (req, res) {
  // TODO Later
  req.flash("success", "Logged In Seccessfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.flash("success", "you have logged out");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
