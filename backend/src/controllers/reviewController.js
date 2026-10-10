import Review from "../models/review.js";
import Booking from "../models/Booking.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, comment } = req.body;

    // Validate the rating
    if (
      rating === undefined ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be whole number between 1 & 5",
      });
    }

    // Validate the optimional comment
    if (
      comment !== undefined &&
      (typeof comment !== "string" || comment.trim().length > 500)
    ) {
      return res.status(400).json({
        message: "Comment must be text with at most 500 characters",
      });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only the customer who made the booking can review it.
    if (booking.customer.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only review your own bookings",
      });
    }

    // Reviews are allowed only after completion.
    if (booking.status !== "completed") {
      return res.status(400).json({
        message: "You can review only completed appointments",
      });
    }

    // Prevent duplicate reviews.
    const existingReview = await Review.findOne({ bookings: bookingId });
    if (existingReview) {
      return res
        .status(409)
        .json({ message: "This booking has already been reviewed" });
    }


    // Save the review
    const review = await Review.create({
        customer: req.user.userId,
        shop : booking.shop,
        barber: booking.barber,
        booking: booking._id,
        rating, 
        comment: comment?.trim() ?? ""
    });

    return res.status(201).json({
        message : "Review submitted successfully",
        review
    })
  } catch (error) {
    // Handles duplicate-key errors, including simultaneous submissions.
    if(error.code === 11000){
        return res.status(409).json({
            message: "This booking has already been recieved"
        });
    }

    return res.status(500).json({
        message: "Failed t submit review",
        error: error.message
    });
  }
};
