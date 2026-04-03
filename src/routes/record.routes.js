const express = require('express');
const recordController = require('../controllers/record.controller');
const recordValidation = require('../validations/record.validation');
const validate = require('../validations/validate.middleware');
const authenticate = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', recordController.getRecords);

router.post('/', authorizeRoles('admin'), recordValidation.createRecordValidation, validate, recordController.createRecord);
router.put('/:id', authorizeRoles('admin'), recordValidation.updateRecordValidation, validate, recordController.updateRecord);
router.delete('/:id', authorizeRoles('admin'), recordController.deleteRecord);

module.exports = router;
