const {Router} = require("express");
const authController = require("../controllers/authController");

const router = Router();


router.post("/signup", authController.signUpPost);
router.post("/login", authController.logInPost);


module.exports = router;
