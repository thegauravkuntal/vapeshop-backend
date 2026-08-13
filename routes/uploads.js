const express = require('express');
const { imageUpload, imageFromUrl } = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/image', protect, admin, imageUpload);
router.post('/from-url', protect, admin, imageFromUrl);

module.exports = router;
