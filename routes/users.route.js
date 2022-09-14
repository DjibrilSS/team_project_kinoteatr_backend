const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const Middleware = require("../middleware/users.middleware");
const router = Router();

router.post("/users/auth", usersController.addUser);
router.post("/users/login", usersController.login);
router.get("/users/user", Middleware, usersController.getUsersid);
router.patch("/users/addFav/:id", usersController.addFavorite);
router.patch('/users/removeFav/:id', Middleware, usersController.removeFavorite)

module.exports = router;
