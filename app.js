// Load environment variables FIRST before any other modules that need them
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const listings = require("./routes/listing");
const reviews = require("./routes/review");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");
const userRouter = require("./routes/user");
const { isLoggedIn } = require("./middleware");
const { validateListing } = require("./middleware");
const { validateReview } = require("./middleware");

// Environment variables
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";
const SESSION_SECRET = process.env.SESSION_SECRET || "thisshouldbeabettersecret!";
const port = process.env.PORT || 3000;

app.use(cookieParser());

main()
  .then(() => console.log("Main function executed successfully"))
  .catch((err) => console.error("Error executing main function:", err));

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));
app.engine("ejs", ejsMate);

const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    touchAfter: 24 * 3600, // lazy session update (only update once per 24 hours)
  }),
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
  },
};
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/listings", listings);
app.use("/", userRouter);
app.use("/listings/:id/reviews", reviews);

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { status, message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
