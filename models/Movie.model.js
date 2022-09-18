const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  image: String,
  poster: String,
  video: String,
  title: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Genre",
    },
  ],
  year: Number,
  country: String,
  description: String,
  price: Number,
  rating: {
    type: Number,
    default: 0,
  },
  ratedUsers: [{ user: mongoose.SchemaTypes.ObjectId, rating: Number }],
  buyUsers: [ {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  }],

  actors: [String],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
