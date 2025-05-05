const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Générer un JWT
const generateToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Inscription
exports.register = async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });

    const user = await User.create({ name, email, password, role, phone });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,  
      token: generateToken(user._id, user.name)
    });
  } catch (err) {
    next(err);
  }
};

// Connexion
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id, user.name)
    });
  } catch (err) {
    next(err);
  }
};