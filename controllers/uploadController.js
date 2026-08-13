const multer = require('multer');

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
  (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
      }

      const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

      res.status(200).json({
        url: dataUri,
        mime: req.file.mimetype,
        size: req.file.buffer.length,
      });
    } catch (error) {
      next(error);
    }
  },
];
