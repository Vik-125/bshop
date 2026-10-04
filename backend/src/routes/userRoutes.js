import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getMyProfile);

export default router;