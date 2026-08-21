const express = require('express');
const { getSeoSettings, updateSeoSettings } = require('../controllers/seoController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getSeoSettings);
router.put('/', protect, admin, updateSeoSettings);

module.exports = router;
