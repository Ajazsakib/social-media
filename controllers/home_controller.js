module.exports.home = function (req, res) {
  console.log(req.cookies);
  // change usr value from cookie
  res.cookie("user_id", 25);
  return res.render("home", {
    title: "Social Media App",
  });
};
