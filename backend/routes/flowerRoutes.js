const {Router} = require("express");
const flowerController = require("../controllers/flowerController");

const router = Router();

router.get("/tree/flowers/:email", flowerController.displayFlowers);
router.post("/flowers/create", flowerController.createFlowerPost)
router.get("/flowers/flower/:id", flowerController.getSelectedFlower)
router.get("/flowers/flower/delete/:id", flowerController.deleteFlower)
router.post("/flowers/flower/update/:id", flowerController.editFlowerPost);
router.post("/flowers/flower/color/update/:id", flowerController.editFlowerPostColor);
router.post("/flowers/flower/check/update/:id", flowerController.editFlowerPostChecked);
router.post("/flowers/flower/questionSeven/update/:id", flowerController.editFlowerQuestionSeven);

module.exports = router;
