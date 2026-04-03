const { body, query } = require('express-validator');

const createRecordValidation = [
    body('amount').isNumeric().withMessage('Valid amount is required'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be either income or expense'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('date').optional().isISO8601().toDate().withMessage('Date must be a valid ISO8601 date'),
    body('note').optional().isString().trim()
];

const updateRecordValidation = [
    body('amount').optional().isNumeric().withMessage('Valid amount is required'),
    body('type').optional().isIn(['income', 'expense']).withMessage('Type must be either income or expense'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
    body('date').optional().isISO8601().toDate().withMessage('Date must be a valid ISO8601 date'),
    body('note').optional().isString().trim()
];

module.exports = {
    createRecordValidation,
    updateRecordValidation
};
