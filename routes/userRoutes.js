const express= require('express');
const { registerController } = require('../controllers/userControllers');

//router object
const router = express.Router();

//routes

router.post('/register',registerController)



module.exports = router;