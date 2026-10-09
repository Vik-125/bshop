// For creating & adding barbers to shpos.

import Barber from "../models/Barber.js";

export const createBarber = async (req, res) => {
  try {
    const { name, bio, experience, specialization, workingHours } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Barber name is required",
      });
    }

    const existingBarber = await Barber.findOne({
      shop: req.shop._id,
      name: name.trim(),
    });

    if (existingBarber) {
      return res.status(409).json({
        message: "Barber already exists in this shop!!",
      });
    }
    
    if (
      !workingHours ||
      workingHours.start === undefined ||
      workingHours.end === undefined ||
      !Number.isFinite(workingHours.start) ||
      !Number.isFinite(workingHours.end) ||
      !Number.isInteger(workingHours.start) ||
      !Number.isInteger(workingHours.end) ||
      workingHours.start < 0 ||
      workingHours.end > 1440 ||
      workingHours.start >= workingHours.end
    ) {
      return res.status(400).json({
        message: "Valid working hours are required",
      });
    }

    const barber = await Barber.create({
      shop: req.shop._id,
      name,
      bio,
      experience,
      specialization,
      workingHours,
    });

    res.status(201).json({
      message: "Barber created successfully",
      barber,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// For retrieving all the barbers related to a paticuler shop.

export const getShopBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find({
      shop: req.params.shopId,
      isActive: true,
    });

    res.status(200).json({
      barbers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// For getting one barber

export const getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.barberId);

    if (!barber) {
      return res.status(404).json({
        message: "Barber not found",
      });
    }

    res.status(200).json({
      barber,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateBarber = async (req, res) => {
  try {
    const { name, bio, experience, specialization } = req.body;

    const barber = req.barber;

    if (name !== undefined) {
      barber.name = name.trim();
    }

    if (bio !== undefined) {
      barber.bio = bio;
    }

    if (experience !== undefined) {
      barber.experience = experience;
    }

    await barber.save();

    res.status(200).json({
      message: "Barber updated successfully",
      barber,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
