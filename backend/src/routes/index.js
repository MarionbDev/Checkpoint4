const router = require("express").Router();

const usersRouter = require("./users.routes");
const drawingsRouter = require("./drawings.routes");
const commentsRouter = require("./comments.routes");
// const authControllers = require("../controllers/authControllers");

// router.get(
//   "/refresh-token",
//   authControllers.verifyToken,
//   authControllers.refreshToken,
//   authControllers.createToken
// );

router.use("/users", usersRouter);
router.use("/drawings", drawingsRouter);
router.use("/comments", commentsRouter);

module.exports = router;
