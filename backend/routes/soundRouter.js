const {Router} = require("express");
const soundController = require("../controllers/soundsController");

const router = Router();

router.get("/sounds/:email", soundController.displaySounds);
router.post("/sounds/create", soundController.createSoundPost)
router.get("/sounds/sound/:id", soundController.getSelectedSound)
router.get("/sounds/sound/delete/:id", soundController.deleteSound)
router.get("/sounds/search/:query/:email", soundController.searchGetSound);

module.exports = router;
