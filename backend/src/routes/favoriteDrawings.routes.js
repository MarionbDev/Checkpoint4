const router = require("express").Router();

const favoriteDrawingsControllers = require("../controllers/favoriteDrawingControllers");

router.get("/", favoriteDrawingsControllers.browse);
router.get("/:id", favoriteDrawingsControllers.read);
router.post("/", favoriteDrawingsControllers.add);
router.put("/:id", favoriteDrawingsControllers.edit);
router.delete("/:id", favoriteDrawingsControllers.destroy);

module.exports = router;
