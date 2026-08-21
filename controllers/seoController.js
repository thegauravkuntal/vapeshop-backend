const SeoSettings = require('../models/SeoSettings');

const ALLOWED_FIELDS = ['title', 'description', 'keywords', 'ogImage', 'favicon'];

exports.getSeoSettings = async (req, res, next) => {
  try {
    const settings = await SeoSettings.getSettings();
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

exports.updateSeoSettings = async (req, res, next) => {
  try {
    const payload = {};
    ALLOWED_FIELDS.forEach((field) => {
      if (typeof req.body[field] === 'string') {
        payload[field] = req.body[field].trim();
      }
    });

    await SeoSettings.getSettings();
    const settings = await SeoSettings.findOneAndUpdate({ key: 'site' }, payload, {
      new: true,
      runValidators: true,
    });
    res.json(settings);
  } catch (error) {
    next(error);
  }
};
