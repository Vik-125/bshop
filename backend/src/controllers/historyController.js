import mongoose from "mongoose";
import History from "../models/History.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

const MAX_PHOTOS = 3;

// Get the logged-in customer's Service history
export const getMyHistory = async (req, res) => {
  try {
    const history = await History.find({
      customer: req.user.userId,
    })
      .populate({
        path: "booking",
        select:
          "appointmentDate startTime endTime status totalPrice totalDuration",
        populate: [
          {
            path: "barber",
            select: "name",
          },
          {
            path: "shop",
            select: "name address",
          },
          {
            path: "services.service",
            select: "name price duration",
          },
        ],
      })
      .select("customer booking notes createdAt updatedAt")
      .sort({ createdAt: -1 });
    return res.status(200).json({ history });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch Service history",
    });
  }
};

// Add or updates notes on a history entry
export const updateNotes = async (req, res) => {
  try {
    const { historyId } = req.params;
    const { notes } = req.body;

    if (!mongoose.isValidObjectId(historyId)) {
      return res.status(400).json({
        message: "Invalid history ID",
      });
    }

    if (typeof notes !== "string" || notes.trim().length > 500) {
      return res.status(400).json({
        message: "Notes must be a string of at most 500 character",
      });
    }

    const history = await History.findOne({
      _id: historyId,
      customer: req.user.userId,
    });

    if (!history) {
      return res.status(404).json({
        message: "History not found",
      });
    }

    history.notes = notes.trim();
    await history.save();

    return res.status(200).json({
      message: "Notes updated",
      history,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update Notes",
    });
  }
};

// Upload images to cloudinary

export const uploadHistoryPhoto = async (req, res) => {
  try {
    const { historyId } = req.params;

    if (!mongoose.isValidObjectId(historyId)) {
      return res.status(400).json({
        message: "Invalid history ID",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const history = await History.findOne({
      _id: historyId,
      customer: req.user.userId,
    });

    if (!history) {
      return res.status(404).json({
        message: "History not found",
      });
    }

    if (history.photo.length >= MAX_PHOTOS) {
      return res.status(409).json({
        message: "Maximum of 3 photos allowed per history entry",
      });
    }

    const uploadedPhoto = await uploadToCloudinary(
      req.file.buffer,
      "bshop/history",
    );

    history.photo.push(uploadedPhoto);
    await history.save();

    return res.status(200).json({
      message: "History photo uploaded successfully",
      photo: history.photo,
      history,
    });
  } catch (error) {
    console.error("History photo upload error:", error);

    return res.status(500).json({
      message: "Failed to upload history photo",
    });
  }
};

export const deleteHistoryPhoto = async (req, res) => {
  try {
    const { historyId } = req.params;
    const { publicId } = req.body;

    if (!mongoose.isValidObjectId(historyId)) {
      return res.status(400).json({
        message: "Invalid history ID",
      });
    }

    if (typeof publicId !== "string" || !publicId.trim()) {
      return res.status(400).json({
        message: "A valid photo publicId is required",
      });
    }

    const history = await History.findOne({
      _id: historyId,
      customer: req.user.userId,
    });

    if (!history) {
      return res.status(404).json({
        message: "History not found",
      });
    }

    const photoIndex = history.photo.findIndex(
      (photo) => photo.publicId === publicId,
    );

    if (photoIndex === -1) {
      return res.status(404).json({
        message: "Photo not found in this history entry",
      });
    }

    // Delete the image from Cloudinary first
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(502).json({
        message: "Could not delete photo from Cloudinary",
      });
    }

    // Remove only the selected photo from MongoDB
    history.photo.splice(photoIndex, 1);
    await history.save();

    return res.status(200).json({
      message: "Photo deleted successfully",
      photo: history.photo,
    });
  } catch (error) {
    console.error("Delete history photo error:", error);

    return res.status(500).json({
      message: "Failed to delete photo",
    });
  }
};
