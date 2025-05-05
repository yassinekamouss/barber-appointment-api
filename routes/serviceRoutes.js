const express = require("express");
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Récupérer tous les services (protégé)
router.get("/", protect, getServices);

// Créer un service (protégé)
router.post("/", protect, createService);

// Mettre à jour un service (protégé)
router.put("/:id", protect, updateService);

// Supprimer un service (protégé)
router.delete("/:id", protect, deleteService);

module.exports = router;
