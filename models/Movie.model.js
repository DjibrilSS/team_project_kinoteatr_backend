const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  image: String,
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
  price:Number,

  actors: [String],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
