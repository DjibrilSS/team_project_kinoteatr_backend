const User = require("../models/User.model");
const Movie = require("../models/Movie.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  addUser: async (req, res) => {
    try {
      const { login, password, wallet, movies } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({
        login: login,
        password: hash,
        wallet: wallet,
        movies: movies,
      });

      res.json(user);
    } catch (e) {
      res.json({ error: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json({ error: "Неверный Логин" });
        // return res.status(401).json({ error: "Неверный логин" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" });
      }
      const payload = {
        id: candidate._id,
      };
      const token = await jwt.sign(
        payload,
        String(process.env.SECRET_JWT_KEY),
        {
          expiresIn: "24h",
        }
      );

      res.json({ token, id: payload.id });
    } catch (e) {
      res.json({ error: e });
    }
  },

  getUsersid: async (req, res) => {
    try {
      const data = await User.findById(req.user.id).populate("movies");
      return res.json(data);
    } catch (e) {
      return res.status(400).json(e.toString());
    }
  },

  addFavorite: async (req, res) => {
    const user = await User.findById(req.params.id);
    const movie = await Movie.findById(req.body.movie);
    try {
      await user.updateOne({ $addToSet: { movies: movie._id } });

      res.json({ movie, user });
    } catch (error) {
      res.json(error + "Ошибка");
    }
  },

  removeFavorite: async (req, res) => {
    const user = await User.findById(req.params.id);
    const movie = await Movie.findById(req.body.movie);

    try {
      await user.updateOne({ $pull: { movies: movie._id } });
      res.json({ movie, user });
    } catch (error) {
      res.json(error + "Ошибка");
    }
  },
};
