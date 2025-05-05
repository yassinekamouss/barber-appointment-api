const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
// const { protect } = require('./middleware/authMiddleware');
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth",  require("./routes/authRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/services", require("./routes/serviceRoutes"));
// app.use("/api/timeslots", require("./routes/timeSlotRoutes"));
// app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
