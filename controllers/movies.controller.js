const Movie = require("../models/Movie.model");

module.exports.moviesController = {
  addMovie: async (req, res) => {
    try {
      const {
        image,
        poster,
        video,
        title,
        genre,
        year,
        country,
        description,
        price,
        actors,
      } = req.body;
      const data = await Movie.create({
        image,
        poster,
        video,
        title,
        genre,
        year,
        country,
        description,
        actors,
        price,
      });
      res.json(data);
    } catch (e) {
      return res.status(400).json(e.toString());
    }
  },

  getMovies: async (req, res) => {
    try {
      const data = await Movie.find().populate("genre buyUsers");
      await res.json(data);
    } catch (e) {
      return res.status(400).json(e.toString());
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const data = await Movie.findByIdAndDelete(req.params.id);
      res.json(data);
    } catch (e) {
      return res.status(400).json(e.toString());
    }
  },
  rateMovie: async (req, res) => {
    const { movieId, rating } = req.body;
    const { id } = req.user;

    try {
      const movie = await Movie.findById(movieId);
      let find = movie.ratedUsers.find((item) => String(item.user) === id);
      if (!find) {
        await movie.updateOne({
          $push: { ratedUsers: { user: id, rating } },
        });
        if (movie.rating !== 0) {
          const sum = movie.ratedUsers.reduce((acc, element) => {
            return acc + Number(element.rating);
          }, 0);
          await movie.updateOne({
            rating: (
              (sum + Number(rating)) /
              (movie.ratedUsers.length + 1)
            ).toFixed(1),
          });
        } else {
          await movie.updateOne({
            rating: rating,
          });
        }
      } else {
        movie.ratedUsers = movie.ratedUsers.map((item) => {
          if (String(item.user) === id) {
            item.rating = rating;
            console.log("as");
          }
          return item;
        });
        await movie.save();
        const sum = movie.ratedUsers.reduce((acc, element) => {
          return acc + Number(element.rating);
        }, 0);
        await movie.updateOne({
          rating: (
            (sum + Number(rating)) /
            (movie.ratedUsers.length + 1)
          ).toFixed(1),
        });
      }

      return res.json(await Movie.findById(movieId));
    } catch (e) {
      return res.json({ error: `ошибка при попытке оставить оценку: ${e}` });
    }
  },
};
