import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import shopOwnerMiddleware from "../middleware/shopOwnerMiddleware.js";
import { createBarber } from "../controllers/barberController.js";


const router = express.Router();

router.post(
    "/shops/:shopId/barbers",
    authMiddleware,
    roleMiddleware("shopOwner"),
    shopOwnerMiddleware,
    createBarber
);


export default router;