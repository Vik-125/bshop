import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api", barberRoutes);


// Services
app.use("/api/service", serviceRoutes);

export default app;