const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../model/listing");
const Review = require("../model/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const {
  validateReview,
  isAuthor,
  isLoggedIn,
  saveRedirectUrl,
} = require("../middleware");
const reviewController = require("../controllers/review");

router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.createReview),
);

router.delete(
  "/:reviewId/delete",
  isAuthor,
  wrapAsync(reviewController.deleteReview),
);
module.exports = router;
