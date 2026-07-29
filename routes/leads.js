const express = require('express');
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', createLead);
router.get('/', protect, admin, getLeads);
router.put('/:id/status', protect, admin, updateLeadStatus);
router.delete('/:id', protect, admin, deleteLead);

module.exports = router;
