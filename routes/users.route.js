
const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const Middleware = require("../middleware/users.middleware");
const router = Router();

router.post("/users/auth", usersController.addUser);
router.post("/users/login", usersController.login);
router.get("/users/user", Middleware, usersController.getUsersid);

module.exports = router;