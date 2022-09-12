const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  image: String,
  title: {
    type: String,
    required: true,
  },
  genre: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Genre",
  }],
  year: Number,
  description: String,

  actors: [String],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
