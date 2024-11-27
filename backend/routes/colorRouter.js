const {Router} = require("express");
const colorController = require("../controllers/colorsController");

const router = Router();

router.get("/colors/:email", colorController.displayColors);
router.post("/colors/create", colorController.createColorPost)
router.get("/colors/:color/:email", colorController.getSelectedColor)
router.get("/colors/color/delete/:id", colorController.deleteColor)


module.exports = router;
