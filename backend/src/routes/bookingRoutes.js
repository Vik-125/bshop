import express from "express";
import {
  createBooking,
  cancelBooking,
  getMyBookings
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// For creating a booking
router.post(
  "/shops/:shopId/barbers/:barberId/bookings",
  authMiddleware,
  roleMiddleware("customer", "shopOwner"),
  createBooking,
);


// For cancelling a booking
router.patch(
    "/bookings/:bookingId/cancel",
    authMiddleware,
    roleMiddleware("customer", "shopOwner"),
    cancelBooking
);

// For retrieving the bookings
router.get("/allBookings",
  authMiddleware,
  roleMiddleware("customer","shopOwner"),
  getMyBookings
);

export default router;
