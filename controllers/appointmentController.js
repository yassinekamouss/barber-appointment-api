const Appointment = require("../models/Appointment.model");
const TimeSlot = require("../models/TimeSlot.model");

// Lister les rendez-vous pour un user (client ou stylist)
exports.getAppointments = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const appts = await Appointment.find({ $or: [{ clientId: userId }] })
      .populate({ 
        path: "timeSlotId", 
        populate: [
          {
            path: "serviceId",
            select: "name duration price",
          },
          {
            path: "stylistId",
            select: "name email phone",
          }
        ],
      })
      .populate("clientId", "name email phone");
    res.json(appts);
  } catch (err) {
    next(err);
  }
};

// Créer une réservation
exports.createAppointment = async (req, res, next) => {
  try {
    const { clientId, timeSlotId, notes } = req.body;
    const slot = await TimeSlot.findById(timeSlotId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: "Créneau indisponible" });
    }
    slot.isBooked = true;
    await slot.save();

    const appointment = await Appointment.create({
      clientId,
      timeSlotId,
      notes,
      stylistId: slot.stylistId,
    });
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour le statut de la réservation
exports.updateAppointment = async (req, res, next) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!appt)
      return res.status(404).json({ message: "Rendez-vous introuvable" });
    res.json(appt);
  } catch (err) {
    next(err);
  }
};
