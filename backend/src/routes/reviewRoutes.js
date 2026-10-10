import express from "express";
import { createReview } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/bookings/:bookingId/reviews",
    authMiddleware,
    createReview
);

export default router;