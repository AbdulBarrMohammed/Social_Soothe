const {Router} = require("express");
const flowerController = require("../controllers/flowerController");

const router = Router();

router.get("/tree/flowers/:email", flowerController.displayFlowers);
router.post("/flowers/create", flowerController.createFlowerPost)
router.get("/flowers/flower/:id", flowerController.getSelectedFlower)
router.get("/flowers/flower/delete/:id", flowerController.deleteFlower)
router.post("/flowers/flower/update/:id", flowerController.editFlowerPost);

module.exports = router;
