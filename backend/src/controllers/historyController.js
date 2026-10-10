import mongoose from "mongoose";
import History from "../models/History.js";

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
