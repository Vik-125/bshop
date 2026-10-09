import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyProfile } from "../controllers/userController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getMyProfile);

router.get("/shop-owner-test",
    authMiddleware,
    roleMiddleware("shopOwner"),
    (req, res) => {
        res.status(200).json({
            message : "You have shop owner access"
        });
    }
);

export default router;