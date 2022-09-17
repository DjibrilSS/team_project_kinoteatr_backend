const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: String,
  login: String,
  wallet: Number,
  movies: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Movie'
  }],
  buymovies: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Movie'
  }]
  
});

const User = mongoose.model("User", userSchema);

module.exports = User;