require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Movie = require("../models/movie");
const movies = require("./imdb250.json");

async function seed() {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected");

    await Movie.deleteMany({});
    await Movie.insertMany(movies);

    console.log("✅ IMDb movies inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
