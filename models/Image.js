const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  data: { type: Buffer, required: true },
  mime: { type: String, required: true },
  size: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
