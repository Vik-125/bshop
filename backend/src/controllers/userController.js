import User from "../models/User.js";

export const getMyProfile = async(req, res) => {
    const userDetails = await User.findById(req.user.userId);

    res.status(200).json({
        message: `You are authenticated ${userDetails.name}`,
        user: req.user
    });
}