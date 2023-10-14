const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get("/current",userController.validateToken)
router.post("/login",userController.loginUser);
router.post("/register",userController.registerUser);

module.exports = router;