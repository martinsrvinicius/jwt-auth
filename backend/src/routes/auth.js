const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/validate", authController.validate);
router.post("/forgot", authController.forgot);
router.patch("/reset", authController.resetPassword);
router.delete("/logout", authController.logout);

module.exports = router;