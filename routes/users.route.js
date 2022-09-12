
const { Router } = require("express");
const { usersController } = require("../controllers/users.controllers");
const router = Router();

router.post("/users/auth", usersController.addUser);
router.post("/users/login", usersController.login);


module.exports = router;