const { Router } = require("express");
const router = Router();
const { genreController } = require("../controllers/genres.controllers");

router.post("/genre", genreController.postGenre);                  
router.delete("/genre/:id", genreController.deleteGenre);          
router.get("/genre", genreController.getGenre);                    

module.exports = router;