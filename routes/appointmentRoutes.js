const express = require("express");
const {
  getAppointments,
  createAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Lister les rendez-vous d'un user (protégé)
router.get("/:userId", protect, getAppointments);

// Créer une réservation (client)
router.post("/", protect, createAppointment);

// Mettre à jour le statut de la réservation (protégé)
router.patch("/:id", protect, updateAppointment);

module.exports = router;
