const router = require("express").Router();
const commentControllers = require("../controllers/commentControllers");

router.get("/", commentControllers.browse);
router.get("/:id", commentControllers.read);
router.post("/", commentControllers.add, commentControllers.read);
router.put("/:id", commentControllers.edit);
router.delete("/:id", commentControllers.destroy);

module.exports = router;
