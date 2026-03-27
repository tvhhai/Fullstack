const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authMiddleware } = require("../middlewares/auth.middleware");
const { loginValidator } = require('../validators/authValidator');
const { validate } = require('../middlewares/validation');

router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
