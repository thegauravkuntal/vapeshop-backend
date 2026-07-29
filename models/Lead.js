const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true, default: '' },
  subject: { type: String, trim: true, default: '' },
  message: { type: String, required: true },
  source: { type: String, default: 'contact-form' },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
