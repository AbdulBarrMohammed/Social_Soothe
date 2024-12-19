const {Router} = require("express");
const soundController = require("../controllers/soundsController");

const router = Router();

router.get("/sounds/:email", soundController.displaySounds);
router.post("/sounds/create", soundController.createSoundPost)
router.get("/sounds/sound/:id", soundController.getSelectedSound)



module.exports = router;
