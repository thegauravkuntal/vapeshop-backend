const express = require('express');
const Image = require('../models/Image');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', image.mime);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(image.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
