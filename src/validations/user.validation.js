const { body } = require('express-validator');

const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['viewer', 'analyst', 'admin']).withMessage('Invalid role specified')
];

const loginValidation = [
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];

const updateRoleValidation = [
    body('role').isIn(['viewer', 'analyst', 'admin']).withMessage('Valid role is required')
];

const toggleStatusValidation = [
    body('isActive').isBoolean().withMessage('isActive must be a boolean value')
];

module.exports = {
    registerValidation,
    loginValidation,
    updateRoleValidation,
    toggleStatusValidation
};
