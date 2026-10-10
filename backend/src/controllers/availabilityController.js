import mongoose from "mongoose";
import Barbershop from "../models/Barbershop.js";
import Barber from "../models/Barber.js";
import Service from "../models/Service.js";
import Booking from "../models/Booking.js";

export const getAvailableSlots = async (req, res) => {
  try {
    const { shopId, barberId } = req.params;
    const { date, services } = req.query;

    if (!date || !services) {
      return res.status(400).json({
        message: "Date and service IDs are required",
      });
    }

    if (
      !mongoose.isValidObjectId(shopId) ||
      !mongoose.isValidObjectId(barberId)
    ) {
      return res.status(400).json({
        message: "Invalid shop ID or barber ID",
      });
    }

    const serviceIds = services.split(",");

    if (
      serviceIds.length === 0 ||
      serviceIds.some((id) => !mongoose.isValidObjectId(id)) ||
      new Set(serviceIds).size !== serviceIds.length
    ) {
      return res.status(400).json({
        message: "Invalid or duplicate service IDs",
      });
    }

    // Validate the date format.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res
        .status(400)
        .json({ message: "Date must use YYYY-MM-DD format" });
    }

    const [year, month, day] = date.split("-").map(Number);
    const dayStart = new Date(year, month - 1, day);

    if (
      dayStart.getFullYear() !== year ||
      dayStart.getMonth() !== month - 1 ||
      dayStart.getDate() !== day
    ) {
      return res.status(400).json({
        message: "Invalid calendar date",
      });
    }

    const dayEnd = new Date(year, month - 1, day + 1);

    // Verfiy that the shop & barber exist & are related.
    const shop = await Barbershop.findById(shopId);

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const barber = await Barber.findById(barberId);

    if (!barber) {
      return res.status(404).json({
        message: "Barber not found",
      });
    }

    if (barber.shop.toString() !== shopId) {
      return res.status(400).json({
        message: "This barber does not belong to the selected shop",
      });
    }

    // Fetch active services belonging to this shop.
    const selectedServices = await Service.find({
      _id: { $in: serviceIds },
      shop: shopId,
      isActive: true,
    });

    if (selectedServices.length !== serviceIds.length) {
      return res
        .status(400)
        .json({ message: "One or more services are invalid or inactive" });
    }

    const totalDuration = selectedServices.reduce(
      (total, service) => total + service.duration,
      0,
    );

    // Fetch confirmed bookings that overlap this calendar day.
    const bookings = await Booking.find({
      barber: barberId,
      status: "confirmed",
      startTime: { $lt: dayEnd },
      endTime: { $gt: dayStart },
    }).select("startTime endTime");

    // Generate candidate start times every 15 minutes.
    const { start, end } = barber.workingHours;
    const slots = [];
    const now = new Date();

    for (
      let startMinutes = start;
      startMinutes + totalDuration <= end;
      startMinutes += 15
    ) {
      const slotStart = new Date(dayStart);
      slotStart.setMinutes(startMinutes);

      const slotEnd = new Date(slotStart.getTime() + totalDuration * 60 * 1000);

      // Don't offer times in the past.
      if (slotStart <= now) {
        continue;
      }

      // Exclude overlapping confirmed appointments.
      const isBooked = bookings.some(
        (booking) => booking.startTime < slotEnd && booking.endTime > slotStart,
      );

      if (!isBooked) {
        slots.push({
          startTime: slotStart,
          endTime: slotEnd,
        });
      }
    }

    // Send the response only after checking every candidate slot.
    return res.status(200).json({
      date,
      totalDuration,
      intervalMinutes: 15,
      availableSlots: slots,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to fetch available slots",
        error: error.message,
      });
  }
};
