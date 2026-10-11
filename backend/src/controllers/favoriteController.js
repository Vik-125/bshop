import mongoose from "mongoose";
import Favorite from "../models/Favorite.js";
import Barber from "../models/Barber.js";

// add favorite barber 
export const addFavorite = async (req, res) => {
  try {
    const { barberId } = req.params;

    if (!mongoose.isValidObjectId(barberId)) {
      return res.status(400).json({
        message: "Invalid barber ID",
      });
    }

    const barber = await Barber.findById(barberId);

    if (!barber) {
      return res.status(404).json({
        message: "Barber not found",
      });
    }

    const favorite = await Favorite.findOneAndUpdate(
      {
        customer: req.user.userId,
        barber: barberId,
      },
      {
        $setOnInsert: {
          customer: req.user.userId,
          barber: barberId,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    return res.status(200).json({
      message: "Barber added to favorites",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Barber is already in favorites",
      });
    }

    return res.status(500).json({
      message: "Failed to add favorite",
    });
  }
};


// Get the logged-in customer's favorites
export const getMyFavorites = async (req, res) =>{
    try {
        const favorites = await Favorite.find({
            customer: req.user.userId,
        })
        .populate({
            path: "barber",
            select: "name shop"
        })
        .sort({ createdAt: -1});

        return res.status(200).json({favorites});
    } catch(error){
        console.error("Get favorites error: ", error);

        return res.status(500).json({
            message: "Failed to fetch favorites"
        });
    }
};

// Return a barber from favorites
export const removeFavorite = async(req, res) => {
    try{
        const{ barberId } = req.params;

        if(!mongoose.isValidObjectId(barberId)){
            return res.status(400).json({
                message: "Invalid barber ID"
            });
        }

        const favorite = await Favorite.findOneAndDelete({
            customer: req.user.userId,
            barber: barberId,
        });

        if(!favorite){
            return res.status(404).json({
                message: "Favorite not found"
            });
        }

        return res.status(200).json({
            message: "Barber removed from favorites"
        });
    } catch(error){
        console.error("Remove favorite error : ", error);

        return res.status(500).json({
            message : "Failed to remove favorite"
        });
    }
};