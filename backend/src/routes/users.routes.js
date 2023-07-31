const router = require("express").Router();

const userControllers = require("../controllers/userControllers");
const drawingControllers = require("../controllers/drawingControllers");
const authControllers = require("../controllers/authControllers");
const favoriteDrawingsControllers = require("../controllers/favoriteDrawingControllers");

router.get("/", userControllers.browse);
router.get("/:id", userControllers.read);
router.get("/:id/drawings", drawingControllers.allCreation);
router.get(
  "/:id/favoriteDrawings",
  authControllers.verifyToken,
  favoriteDrawingsControllers.findAllFavoritesByUser
);

router.put("/:id", userControllers.edit);

router.post(
  "/",
  userControllers.hashPassword,

  userControllers.add,
  userControllers.read // données renvoyées sans le champ password
);
router.post("/login", userControllers.login, authControllers.createToken);

// Seul l'admin peut supprimer un compte user
router.delete(
  "/:id",
  authControllers.verifyToken,
  authControllers.isAdmin,
  userControllers.destroy
);

router.delete(
  "/:id/favoriteDrawings/:drawingId",
  authControllers.verifyToken,
  favoriteDrawingsControllers.destroy
);

module.exports = router;
