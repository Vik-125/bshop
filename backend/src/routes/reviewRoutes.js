import express from "express";
import { createReview,
    getBarberReviews,
    getBarberRating
 } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// For creating reviews
router.post("/bookings/:bookingId/reviews",
    authMiddleware,
    createReview
);

// For rating & reviews
router.get(
    "/barbers/:barberId/reviews",
    getBarberReviews
)
router.get(
    "/barbers/:barberId/rating",
    getBarberRating
)
export default router;