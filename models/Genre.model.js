const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    nameGenre: String,
    descriptionGenre: String,
    movies:[{
        type:mongoose.Types.ObjectId
    }]
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre