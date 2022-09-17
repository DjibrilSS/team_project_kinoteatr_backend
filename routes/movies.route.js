const { Router } = require("express");
const { moviesController } = require("../controllers/movies.controller");
const Middleware = require("../middleware/users.middleware");
const router = Router();

router.post("/movies", moviesController.addMovie);
router.patch("/movies", Middleware, moviesController.rateMovie);
router.get("/movies", moviesController.getMovies);
router.delete("/movies/:id", moviesController.deleteMovie);

module.exports = router;
