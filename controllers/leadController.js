const Lead = require('../models/Lead');

exports.createLead = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ message: 'Name aur message zaroori hai' });
    }
    const lead = await Lead.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Message sent successfully!', lead });
  } catch (error) {
    next(error);
  }
};

exports.getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

exports.updateLeadStatus = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};
