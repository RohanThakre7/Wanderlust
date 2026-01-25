const User = require("../model/user")
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { saveRedirectUrl } = require("../middleware");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");


module.exports.userSignup =  wrapAsync(async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to the App!");
      res.redirect("/listings");
    });
  } catch (err) {
    // Duplicate email error (MongoDB)
    if (err.code === 11000 && err.keyPattern?.email) {
      req.flash("error", "Email already registered. Please use another email.");
      return res.redirect("/signup");
    }

    if (err.name === "UserExistsError") {
      req.flash("error", "Username already exists. Try another one.");
      return res.redirect("/signup");
    }

    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

module.exports.userLogin =  saveRedirectUrl,passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
}),async (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectedUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectedUrl);
};

module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have been logged out.");
    res.redirect("/listings");
  });
};
