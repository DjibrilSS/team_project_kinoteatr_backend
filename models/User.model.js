const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: String,
  login: {
    type: String,
  },

 
});

const User = mongoose.model("User", userSchema);

module.exports = User;