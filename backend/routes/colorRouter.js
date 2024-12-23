const {Router} = require("express");
const colorController = require("../controllers/colorsController");

const router = Router();

router.get("/colors/:email", colorController.displayColors);
router.post("/colors/create", colorController.createColorPost)


module.exports = router;
