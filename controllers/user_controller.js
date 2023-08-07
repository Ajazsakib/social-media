const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then(function (user) {
        if (user) {
          return res.render("profile", {
            title: "User Profile",
            user: user,
          });
        } else {
          return res.rediect("/users/sign-in");
        }
      })
      .catch(function (err) {
        return res.rediect("/users/sign-in");
      });
  } else {
    return res.rediect("/users/sign-in");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Social Media || Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
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
  // steps to authenticate
  // find the user

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (user) {
        // handle if password not matched
        if (user.password != req.body.password) {
          return res.redirect("back");
        }

        // handle session creation
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      } else {
        // User not found
        return res.redirect("back");
      }
    })
    .catch(function (err) {
      if (err) {
        console.log("Error in finding user in signing up");
        return res.redirect("back");
      }
    });
};

// handle logout
module.exports.logout = function (req, res) {
  // Clear The cookie
  res.clearCookie("user_id");

  console.log("Clearing Cookie");

  res.redirect("/users/sign-in");
};
