const express = require("express");
const router = express.Router();
const Listing = require("../model/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const mongoose = require("mongoose");
const { isLoggedIn } = require("../middleware");
const { validateListing } = require("../middleware");
const listingController = require("../controllers/listing");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

//index and create
router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(listingController.create),
);

//new
router.get("/new", isLoggedIn, listingController.new);

//show and update
router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.update),
  );

//edit & update

router.get("/:id/edit", wrapAsync(listingController.edit));

//delete
router.delete("/:id/delete", wrapAsync(listingController.delete));

module.exports = router;
