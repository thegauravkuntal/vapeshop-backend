const multer = require('multer');
const Image = require('../models/Image');

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_FILE_SIZE = 8 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME.has(file.mimetype)) {
    return cb(new Error('Only image files (jpg, png, webp, gif) are allowed'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

exports.imageUpload = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
      }

      const image = await Image.create({
        data: req.file.buffer,
        mime: req.file.mimetype,
        size: req.file.buffer.length,
      });

      const proto = req.headers['x-forwarded-proto'] || req.protocol;
      const url = `${proto}://${req.get('host')}/api/images/${image._id}`;

      res.status(201).json({
        id: image._id,
        url,
        mime: req.file.mimetype,
        size: req.file.buffer.length,
      });
    } catch (error) {
      next(error);
    }
  },
];

exports.imageFromUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: 'Image URL required' });
    }

    let parsed;
    try {
      parsed = new URL(url.trim());
    } catch {
      return res.status(400).json({ message: 'Invalid image URL' });
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return res.status(400).json({ message: 'Only http/https URLs allowed' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    let response;
    try {
      response = await fetch(parsed.toString(), { signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      return res.status(400).json({ message: `Failed to download image (HTTP ${response.status})` });
    }

    const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!ALLOWED_MIME.has(contentType)) {
      return res.status(400).json({ message: `URL is not an image (${contentType || 'unknown type'})` });
    }

    const buf = Buffer.from(await response.arrayBuffer());
    if (buf.length > MAX_FILE_SIZE) {
      return res.status(400).json({ message: 'Image is too large (max 8MB)' });
    }

    const image = await Image.create({
      data: buf,
      mime: contentType,
      size: buf.length,
    });

    const proto = req.headers['x-forwarded-proto'] || req.protocol;
    const imageUrl = `${proto}://${req.get('host')}/api/images/${image._id}`;

    res.status(201).json({
      id: image._id,
      url: imageUrl,
      mime: contentType,
      size: buf.length,
    });
  } catch (error) {
    next(error);
  }
};
