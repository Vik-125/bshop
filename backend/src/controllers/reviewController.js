import Review from "../models/review.js";
import Booking from "../models/Booking.js";
import Barber from "../models/Barber.js";

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
      shop: booking.shop,
      barber: booking.barber,
      booking: booking._id,
      rating,
      comment: comment?.trim() ?? "",
    });

    return res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    // Handles duplicate-key errors, including simultaneous submissions.
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This booking has already been recieved",
      });
    }

    return res.status(500).json({
      message: "Failed t submit review",
      error: error.message,
    });
  }
};

export const getBarberReviews = async (req, res) => {
  try {
    const { barberId } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(barberId)) {
      return res.status(400).json({
        message: "Invalid barber ID format",
      });
    }

    const barber = await Barber.findById(barberId);

    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    const reviews = await Review.find({ barber: barberId })
      .populate("customer", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch barber reviews",
      error: error.message,
    });
  }
};

export const getBarberRating = async (req, res) => {
  try {
    const { barberId } = req.params;

    // 1. Validate barber ID format.
    if (!/^[a-fA-F0-9]{24}$/.test(barberId)) {
      return res.status(400).json({ message: "Invalid barber ID format" });
    }

    const barber = await Barber.findById(barberId);

    if (!barber) {
      return res.status(404).json({
        message: "Barber not found",
      });
    }

    // calculate rating statistics in MongoDB.
    const result = await Review.aggregate([
      {
        $match: {
          barber: barber._id,
        },
      },
      {
        $group: {
          _id: "$barber",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Barber with no reviews
    const rating =
      result.length > 0
        ? {
            averageRating: Number(result[0].averageRating.toFixed(1)),
            totalReviews: result[0].totalReviews,
          }
        : {
            averageRating: 0,
            totalReviews: 0,
          };

    return res.status(200).json(rating);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch barber rating",
      error: error.message,
    });
  }
};
