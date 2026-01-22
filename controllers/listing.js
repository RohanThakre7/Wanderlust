const Listing = require("../model/listing");

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const { reviewSchema } = require("../schema");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const { q } = req.query;

  let allListings;

  if (q && q.trim() !== "") {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
      ],
    });
  } else {
    allListings = await Listing.find({});
  }
  console.log("Search query:", req.query.q);

  res.render("listings/index", { allListings, q });
};

module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.create = async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if (req.file) {
      // CloudinaryStorage returns: req.file.path = Cloudinary URL, req.file.filename = public_id
      console.log("Uploaded file:", req.file); // Debug log
      newListing.image = {
        filename: req.file.filename,
        path: req.file.path, // Cloudinary URL
      };
    }

    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect(`/listings`);
  } catch (error) {
    console.error("Error creating listing:", error);
    console.error("Error stack:", error.stack);
    req.flash("error", "Failed to create listing: " + error.message);
    res.redirect("/listings/new");
  }
};
module.exports.show = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    req.flash("error", "Invalid listing ID");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  let originalimagepath = listing.image.path;
  originalimagepath = originalimagepath.replace(
    "/uploads/w_250",
    "/uploads/w_10",
  );
  res.render("listings/edit.ejs", { listing });
};
module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file) {
    listing.image = {
      filename: req.file.filename,
      path: req.file.path, // Cloudinary URL
    };
  }
  await listing.save();
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
};
