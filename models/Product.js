const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sku: { type: String, default: '' },
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  image: { type: String, default: '' },
  inventory: { type: Number, default: 0 },
  weight: { type: Number, default: null },
}, { _id: true });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [{ url: String, order: Number }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  variants: [variantSchema],
  ribbonText: { type: String, default: '' },
  purchasable: { type: Boolean, default: true },
  isHidden: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

productSchema.index({ title: 'text', subtitle: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
