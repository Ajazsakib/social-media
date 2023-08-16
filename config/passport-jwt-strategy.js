const passport = require("passport");

const JWTstrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "learn",
};

passport.use(
  new JWTstrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id)
      .then(function (user) {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(function (err) {
        console.log("Error in finding error", err);
      });
  })
);

module.exports = passport;
