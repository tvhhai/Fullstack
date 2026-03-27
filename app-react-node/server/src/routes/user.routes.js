const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const {
    getUsersValidator,
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator
} = require("../validators/userValidator");
const { validate } = require('../middlewares/validation');

// GET /api/users - Get all users with pagination and filtering
router.get('/',
    authMiddleware,
    getUsersValidator,
    validate,
    userController.getAllUsers
);

// POST /api/users - Create new user
router.post('/',
    authMiddleware,
    createUserValidator,
    validate,
    userController.createUser
);

// GET /api/users/:id - Get user by ID
router.get('/:id',
    authMiddleware,
    getUserValidator,
    validate,
    userController.getUserById
);

// PUT /api/users/:id - Update user
router.put('/:id',
    authMiddleware,
    updateUserValidator,
    validate,
    userController.updateUser
);

// DELETE /api/users/:id - Delete user
router.delete('/:id',
    authMiddleware,
    deleteUserValidator,
    validate,
    userController.deleteUser
);

module.exports = router;
