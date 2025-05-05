const Service = require('../models/Service.model');

// Lister toutes les prestations
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    next(err);
  }
};

// Créer une prestation
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour une prestation
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: 'Service introuvable' });
    res.json(service);
  } catch (err) {
    next(err);
  }
};

// Supprimer une prestation
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service introuvable' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};