import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import shopOwnerMiddleware from "../middleware/shopOwnerMiddleware.js";
import { createService } from "../controllers/serviceControllers.js";

const router = express.Router();

router.post(
    "/shops/:shopId/services",
    authMiddleware,
    roleMiddleware("shopOwner"),
    shopOwnerMiddleware,
    createService
);

export default router;