const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const port = 8000;

const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));

// use express router
app.use("/", require("./routes/index"));

// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
