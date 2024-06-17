const express = require("express");
const {
  registerController,
  LoginController,
  updateUserController,
  requireSingIn ,
} = require("../controllers/userControllers");

//router object
const router = express.Router();

//routes

router.post("/register", registerController);

router.post("/login", LoginController);
router.put("/update-user",requireSingIn , updateUserController);
module.exports = router;
