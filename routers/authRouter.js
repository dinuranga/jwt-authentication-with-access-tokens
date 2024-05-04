const express = require('express');
const router = express.Router();
const {loginUser,logoutUser, authenticate} = require('../controllers/authController');
const {protected} = require('../controllers/dataController');

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/data",authenticate, protected);

module.exports = router;