const mongoose = require('mongoose');

const seoSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    title: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    keywords: { type: String, default: '', trim: true },
    ogImage: { type: String, default: '', trim: true },
    favicon: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

seoSettingsSchema.statics.getSettings = async function () {
  let doc = await this.findOne({ key: 'site' });
  if (!doc) {
    doc = await this.create({ key: 'site' });
  }
  return doc;
};

module.exports = mongoose.model('SeoSettings', seoSettingsSchema);
