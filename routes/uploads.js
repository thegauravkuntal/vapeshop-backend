const express = require('express');
const { imageUpload } = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/image', protect, admin, imageUpload);

module.exports = router;
