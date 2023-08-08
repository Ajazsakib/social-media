const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "User Profile",
  });
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
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
