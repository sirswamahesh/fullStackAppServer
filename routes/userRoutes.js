const express = require("express");
const {
  registerController,
  LoginController,
} = require("../controllers/userControllers");

//router object
const router = express.Router();

//routes

router.post("/register", registerController);

router.post("/login", LoginController);

module.exports = router;
