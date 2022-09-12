const { Router } = require("express");
const router = Router();
const { commentControllers } = require("../controllers/comments.controllers")
const Middleware = require("../middleware/users.middleware");

router.post("/commit", Middleware, commentControllers.addComment)
router.get("/commit",  commentControllers.getComment)
router.delete("/commit/:id", Middleware, commentControllers.deleteComment)

module.exports = router;
