const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
