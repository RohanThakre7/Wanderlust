const Review = require("../model/review");
const mongoose = require("mongoose");
const Listing = require("../model/listing");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);
  listing.reviews.push(newReview);
  newReview.author = req.user._id;

  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
};
