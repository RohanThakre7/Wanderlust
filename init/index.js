const mongoose = require("mongoose");
const { data } = require("./data.js");
const Listing = require("../model/listing");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDatabase() {
  try {
    await Listing.deleteMany({});

    const listingOwner = data.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("64b8f0f2f2f2f2f2f2f2f2f2"),
    }));

    await Listing.insertMany(listingOwner);
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
  await initDatabase();
}

main()
  .then(() => console.log("Main function executed successfully"))
  .catch((err) => console.error("Error executing main function:", err));
