const User = require('../models/User.model');

// Récupérer tous les utilisateurs (protégé admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Obtenir un utilisateur par ID
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Lister tous les stylistes
exports.getStylists = async (req, res, next) => {
  try {
    const stylists = await User.find({ role: 'stylist' }).select('-password');
    res.json(stylists);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    // Empêcher mise à jour du mot de passe ici
    delete updates.password;
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

