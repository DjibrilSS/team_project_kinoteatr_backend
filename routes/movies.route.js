const { Router } = require("express");
const { moviesController } = require("../controllers/movies.controller");
const router = Router();

router.post("/movies", moviesController.addMovie);
router.get("/movies", moviesController.getMovies);
router.delete("/movies/:id", moviesController.deleteMovie);

module.exports = router;
