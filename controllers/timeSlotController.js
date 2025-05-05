const TimeSlot = require('../models/TimeSlot.model');

// Lister les créneaux (optionnellement filtrés)
exports.getTimeSlots = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    if (req.query.stylist) filter.stylistId = req.query.stylist;
    const slots = await TimeSlot.find(filter)
      .populate('serviceId')
      .populate('stylistId', 'name phone');
    res.json(slots);
  } catch (err) {
    next(err);
  }
};

// Créer un créneau
exports.createTimeSlot = async (req, res, next) => {
  try {
    const slot = await TimeSlot.create(req.body);
    res.status(201).json(slot);
  } catch (err) {
    next(err);
  }
};

// Supprimer un créneau
exports.deleteTimeSlot = async (req, res, next) => {
  try {
    const slot = await TimeSlot.findByIdAndDelete(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Créneau introuvable' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};