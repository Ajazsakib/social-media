const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email })
        .then(function (user) {
          if (!user || user.password != password) {
            req.flash("error", "Invalid Username/Password");
            console.log("Invalid Username/Password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(function (err) {
          console.log("Error in finding user");
          req.flash("error", err);
          return done(err);
        });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// de-serializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (err) {
      console.log("Error in finding the user");
      return done(err);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

// set the user for the views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to local for the views
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
