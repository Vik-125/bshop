import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";;
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
    "/shops/:shopId/barbers/:barberId/bookings",
    authMiddleware,
    roleMiddleware("customer", "shopOwner"),
    createBooking
);

export default router;