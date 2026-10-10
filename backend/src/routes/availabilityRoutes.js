import express from "express";
import { getAvailableSlots } from "../controllers/availabilityController.js";

const router = express.Router();

router.get("/shops/:shopId/barbers/:barberId/availability",
    getAvailableSlots
);

export default router;