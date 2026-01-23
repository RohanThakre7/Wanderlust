const express = require("express");
const router = express.Router();
const User = require("../model/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});
router.post("/signup", wrapAsync(userController.userSignup));
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  saveRedirectUrl,
 
  userController.userLogin,
);

router.get("/logout", userController.userLogout);

module.exports = router;
