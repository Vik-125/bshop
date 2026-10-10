import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import availableRoutes from "./routes/availabilityRoutes.js"
import historyRoutes from "./routes/historyRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Shops
app.use("/api/shops", shopRoutes);

// Barber
app.use("/api", barberRoutes);

// Services
app.use("/api/service", serviceRoutes);

// Bookings
app.use("/api", bookingRoutes);

// Reviews
app.use("/api", reviewRoutes);

// Slots
app.use("/api", availableRoutes);

// History
app.use("/api/history", historyRoutes)

export default app;