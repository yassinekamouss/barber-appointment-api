const express = require("express");
const {
  getTimeSlots,
  createTimeSlot,
  deleteTimeSlot,
} = require("../controllers/timeSlotController");
const { protect, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

// Lister les créneaux (public)
router.get("/", getTimeSlots);

// Créer un créneau (stylist)
router.post("/", protect, authorize("stylist", "admin"), createTimeSlot);

// Supprimer un créneau (stylist)
router.delete("/:id", protect, authorize("stylist", "admin"), deleteTimeSlot);

module.exports = router;
