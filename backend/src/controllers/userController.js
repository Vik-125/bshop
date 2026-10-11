import User from "../models/User.js";
import Favorite from "../models/Favorite.js";

export const getMyProfile = async (req, res) => {
  const userDetails = await User.findById(req.user.userId)
    .select("-password")
    .lean();

  if (!userDetails) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const favorites = await Favorite.find({ customer: req.user.userId })
    .populate({
      path: "barber",
      select: "name shop",
      populate: { path: "shop", select: "name address" },
    })
    .sort({ createdAt: -1 })
    .lean();

  res
    .status(200)
    .json({
      message: "Profile fetched successfully",
      user: {
        ...userDetails,
        favoriteBarbers: favorites.map((item) => item.barber),
      },
    });
};
