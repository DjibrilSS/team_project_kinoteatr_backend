const mongoose = require('mongoose');

const commentShema = mongoose.Schema({
   comment: String,
   movie:{
    ref: "Movie",
    type: mongoose.SchemaTypes.ObjectId
},
   user:{
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId
},
});

const Comment = mongoose.model('Comment', commentShema)

module.exports = Comment