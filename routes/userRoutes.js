const express = require('express');
const { getAllUsers, getUser, getStylists, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Récupérer les utilisateurs (protégé admin)
router.get('/', protect, getAllUsers);

// Lister les stylistes
router.get('/stylists', getStylists);

// Récupérer un utilisateur (protégé)
router.get('/:id', protect, getUser);

// Mettre à jour un utilisateur (protégé)
router.put('/:id', protect, updateUser);

module.exports = router;
