const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('../config/passport');

router.get("/",  passport.authenticate('jwt', {session: false}), authController.get_user);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;