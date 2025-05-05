const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new mongoose.Schema({
    clientId:{
        type: Schema.types.ObjectId,
        ref: 'User',
        required: true,
    },
    timeSlotId: {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlot',
        required: true,
    },
    status: {
        type: String, 
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    },
    notes: {
        type: String,
        default: '',
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;