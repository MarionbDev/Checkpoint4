const router = require("express").Router();

const usersRouter = require("./users.routes");
const drawingsRouter = require("./drawings.routes");
const favoriteDrawingsRouter = require("./favoriteDrawings.routes");
const commentsRouter = require("./comments.routes");

router.use("/users", usersRouter);
router.use("/drawings", drawingsRouter);
router.use("/favoriteDrawings", favoriteDrawingsRouter);
router.use("/comments", commentsRouter);

module.exports = router;
