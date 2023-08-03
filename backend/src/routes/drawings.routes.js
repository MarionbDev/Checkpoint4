const router = require("express").Router();

const drawingControllers = require("../controllers/drawingControllers");
const authControllers = require("../controllers/authControllers");
const uploadDrawingImage = require("../controllers/uploadControllers");
const commentControllers = require("../controllers/commentControllers");

router.get("/", drawingControllers.browse);
router.get("/:id", drawingControllers.read);
router.get("/:id", commentControllers.allCommentByDrawing);

router.put("/:id", drawingControllers.edit);

// Seul l'admin peut créer et supprimer un dessin
router.post(
  "/",
  authControllers.verifyToken,
  authControllers.isAdmin,
  uploadDrawingImage.uploadDrawingImage,
  drawingControllers.add
);
router.delete(
  "/:id",
  authControllers.verifyToken,
  authControllers.isAdmin,
  drawingControllers.destroy
);

module.exports = router;
