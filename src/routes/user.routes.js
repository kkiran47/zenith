const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validate = require('../validations/validate.middleware');
const authenticate = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

const router = express.Router();

router.post('/register', userValidation.registerValidation, validate, userController.registerUser);
router.post('/login', userValidation.loginValidation, validate, userController.loginUser);

router.use(authenticate);
router.get('/profile', userController.getProfile);

router.patch('/:id/role', authorizeRoles('admin'), userValidation.updateRoleValidation, validate, userController.updateUserRole);
router.patch('/:id/status', authorizeRoles('admin'), userValidation.toggleStatusValidation, validate, userController.toggleUserStatus);

module.exports = router;
