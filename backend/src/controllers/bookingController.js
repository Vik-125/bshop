import Booking from "../models/Booking.js";
import Barber from "../models/Barber.js";
import Service from "../models/Service.js";
import Barbershop from "../models/Barbershop.js";
import HaircutHistory from "../models/History.js";

export const createBooking = async (req, res) => {
  try {
    const { shopId, barberId } = req.params;
    const { services, appointmentDate, startTime } = req.body;

    if (
      !shopId ||
      !barberId ||
      !Array.isArray(services) ||
      services.length === 0 ||
      !appointmentDate ||
      !startTime
    ) {
      return res.status(400).json({
        message:
          "Shop, barber, services, appointment date & starting time required",
      });
    }

    // Ensuring service IDs are valid MongoDB ObjectIds
    const validServiceIds = services.every(
      (id) => typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id),
    );

    if (!validServiceIds) {
      return res.status(400).json({
        message: "All service IDs must be valid",
      });
    }

    const requestedDate = new Date(appointmentDate);
    const requestedStart = new Date(startTime);

    if (
      Number.isNaN(requestedDate.getTime()) ||
      Number.isNaN(requestedStart.getTime())
    ) {
      return res.status(400).json({
        message: "Invalid appointment date or start time",
      });
    }

    // Check whether the barber belongs to that shop or not.
    const shop = await Barbershop.findById(shopId);

    if (!shop) {
      return res.status(400).json({
        message: "Shop not found",
      });
    }

    const barber = await Barber.findById(barberId);

    if (!barber) {
      return res.status(404).json({
        message: "Barber not found",
      });
    }

    if (barber.shop.toString() != shopId) {
      return res.status(400).json({
        message: "This barber does not belong to the selected shop",
      });
    }

    // Fetch all the selected services from the database
    const selectedServices = await Service.find({
      _id: { $in: services },
      shop: shopId,
      isActive: true,
    });

    // Ensure every requested service is valid and belongs to this shop
    if (selectedServices.length !== services.length) {
      return res.status(400).json({
        message:
          "One or more services are invalid, inactive, or do not belong to this shop",
      });
    }

    // Prepare service details for the booking
    const bookingServices = selectedServices.map((service) => ({
      service: service._id,
      name: service.name,
      price: service.price,
      duration: service.duration,
    }));

    const totalPrice = bookingServices.reduce(
      (total, service) => total + service.price,
      0,
    );

    const totalDuration = bookingServices.reduce(
      (total, service) => total + service.duration,
      0,
    );
    // Ensure the appointment date and start time are on the same day
    const appointmentDay = new Date(appointmentDate);

    if (
      appointmentDay.getFullYear() !== requestedStart.getFullYear() ||
      appointmentDay.getMonth() !== requestedStart.getMonth() ||
      appointmentDay.getDate() !== requestedStart.getDate()
    ) {
      return res.status(400).json({
        message: "Appointment date must match the start time date",
      });
    }

    // Calculate the end time using the total service duration
    const requestedEnd = new Date(
      requestedStart.getTime() + totalDuration * 60 * 1000,
    );

    // Convert start and end times into minutes from midnight
    const startMinutes =
      requestedStart.getUTCHours() * 60 + requestedStart.getUTCMinutes() + 330;

    const endMinutes =
      requestedEnd.getUTCHours() * 60 + requestedEnd.getUTCMinutes() + 330;

    // Keep minutes within the 0–1439 range.
    const normalizedStartMinutes = startMinutes % 1440;
    const normalizedEndMinutes = endMinutes % 1440;

    // Check the barber's working hours
    const { start, end } = barber.workingHours;

    if (
      startMinutes < start ||
      endMinutes > end ||
      requestedEnd.getUTCDate() !== requestedStart.getUTCDate()
    ) {
      return res.status(400).json({
        message: "The appointment falls outside the barber's working hours",
      });
    }

    // check for overlapping bookings with this barber
    const overlappingBooking = await Booking.findOne({
      barber: barberId,
      status: { $in: ["confirmed"] },
      startTime: { $lt: requestedEnd },
      endTime: { $gt: requestedStart },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "This barber is already booked during the selected time",
      });
    }

    // Save the booking
    const booking = await Booking.create({
      customer: req.user.userId,
      shop: shopId,
      barber: barberId,
      services: bookingServices,
      appointmentDate: requestedDate,
      startTime: requestedStart,
      endTime: requestedEnd,
      totalPrice,
      totalDuration,
      status: "confirmed",
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!bookingId) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only the customer who booked or the shopOwner can cancel.
    if (req.user.role === "customer") {
      if (booking.customer.toString() !== req.user.userId) {
        return res.status(403).json({
          message: "You cannot cancel someone else's booking",
        });
      }
    } else if (req.user.role == "shopOwner") {
      const shop = await Barbershop.findById(booking.shop);

      if (!shop || shop.owner.toString() !== req.user.userId) {
        return res.status(403).json({
          message: "You do not own this shop",
        });
      }
    }

    if (booking.status !== "confirmed") {
      return res.status(400).json({
        message: "Only confirmed bookings can be cancelled",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// For fetxhing all the bookings of a user.

export const getMyBookings = async (req, res) => {
  try {
    let bookings;

    // Customers can see only their bookings
    if (req.user.role === "customer") {
      bookings = await Booking.find({
        customer: req.user.userId,
      })
        .populate("shop", "name address")
        .populate("barber", "name")
        .sort({ startTime: -1 });
    }
    // Shop owners can see all bookings for their each shops
    else if (req.user.role === "shopOwner") {
      const shops = await Barbershop.find({ owner: req.user.userId }).select(
        "_id",
      );

      const shopIds = shop.map((shop) => shop._id);

      bookings = await Booking.find({
        shop: { $in: shopIds },
      })
        .populate("shop", "name address")
        .populate("barber", "name")
        .populate("customer", "name email")
        .sort({ startTime: -1 });
    }
    return res.status(200).json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Bookings",
      error: error.message,
    });
  }
};

export const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Only the owner of the shop can complete a booking
    const shop = await Barbershop.findById(booking.shop);

    if (!shop || shop.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You do not own this shop",
      });
    }

    // Only confirmed bookings can be completed
    if (booking.status !== "confirmed") {
      return res.status(400).json({
        message: "Only confirmed bookings can be completed",
      });
    }

    booking.status = "completed";
    await booking.save();

    // Creating history for the customer
    await HaircutHistory.create({
      customer: booking.customer,
      booking: booking._id,
      note: "",
    });

    return res.status(200).json({
      message: "Booking marked as completed",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to complete booking",
      error: error.message,
    });
  }
};
