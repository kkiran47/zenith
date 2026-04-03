const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const authenticate = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/summary', authorizeRoles('admin', 'analyst'), dashboardController.getSummary);

module.exports = router;
