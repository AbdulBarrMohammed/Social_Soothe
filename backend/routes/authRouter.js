const {Router} = require("express");
const authController = require("../controllers/authController");

const router = Router();


router.post("/signup", authController.signUpPost);
router.post("/login", authController.logInPost);
router.get("/user/:email", authController.getUserInfo);
router.post("/user/update", authController.updateCoin);
router.post("/user/sound/update", authController.updateSound);


//update user info


module.exports = router;
