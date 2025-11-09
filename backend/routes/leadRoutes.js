const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// All lead routes are protected
router.use(authenticateToken);

// CRUD operations
router.post('/', authorizeRole(['Admin', 'Manager', 'Sales Executive']), leadController.createLead);
router.get('/', authorizeRole(['Admin', 'Manager', 'Sales Executive']), leadController.getLeads);
router.get('/:id', authorizeRole(['Admin', 'Manager', 'Sales Executive']), leadController.getLeadById);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
