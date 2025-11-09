const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

// All dashboard routes are protected
router.use(authenticateToken);

// Get dashboard data
router.get('/', dashboardController.getDashboardData);

module.exports = router;
