const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { authenticateToken } = require('../middleware/auth');

// All activity routes are protected
router.use(authenticateToken);

// Create a new activity
router.post('/', activityController.createActivity);

// Get all activities for a lead
router.get('/:lead_id', activityController.getActivitiesForLead);

module.exports = router;
