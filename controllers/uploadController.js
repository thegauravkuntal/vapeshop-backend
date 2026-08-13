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

      const url = `${req.protocol}://${req.get('host')}/api/images/${image._id}`;

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
