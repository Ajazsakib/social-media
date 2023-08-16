const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = 8000;

const db = require("./config/mongoose");

const session = require("express-session");

const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");

const MongoStore = require("connect-mongo")(session);

const sassMiddleware = require("sass-middleware");

const flash = require("connect-flash");

const customMiddleware = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss", // Source directory of your Sass files
    dest: "./assets/css", // Destination directory for compiled CSS
    debug: true, // Enable debugging
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));

// make the upload path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db

// use session

app.use(
  session({
    name: "Social Media",
    // Todo change  the secret before deployment
    secret: "mylittlesecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "Connect Mongo DB Setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use flash
app.use(flash());
app.use(customMiddleware.setFlash);

// use express router
app.use("/", require("./routes/"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
