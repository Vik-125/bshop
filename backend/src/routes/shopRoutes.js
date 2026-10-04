import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createShop } from "../controllers/shopConroller.js";

const router = express.Router();

router.post("/",
    authMiddleware,
    roleMiddleware("shopOwner"),
    createShop
);

export default router;