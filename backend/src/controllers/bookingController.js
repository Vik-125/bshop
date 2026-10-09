import Booking from "../models/Booking.js";
import Barber from "../models/Barber.js";
import Service from "../models/Service.js";
import Barbershop from "../models/Barbershop.js";

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
    const bookingServices = selectedServices.map(
      (service) => ({
        service: service._id,
        name: service.name,
        price: service.price,
        duration: service.duration,
      }),
    );

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
      requestedStart.getHours() * 60 + requestedStart.getMinutes();

    const endMinutes = requestedEnd.getHours() * 60 + requestedEnd.getMinutes();

    // Check the barber's working hours
    const { start, end } = barber.workingHours;

    if (
      startMinutes < start ||
      endMinutes > end ||
      requestedEnd.getDate() !== requestedStart.getDate()
    ) {
      return res.status(400).json({
        message: "The appointment falls outside the barber's working hours",
      });
    }

    // check for overlapping bookings with this barber
    const overlappingBooking = await Booking.findOne({
        barber: barberId,
        status: {$in: ["confirmed"]},
        startTime: { $lt : requestedEnd},
        endTime :{$gt: requestedStart}
    });

    if(overlappingBooking){
        return res.status(409).json({
            message: "This barber is already booked during the selected time"
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
        status: "confirmed"
    });

    return res.status(201).json({
        message: "Appointment booked successfully",
        booking
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};
