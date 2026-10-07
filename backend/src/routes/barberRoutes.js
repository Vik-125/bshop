import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import shopOwnerMiddleware from "../middleware/shopOwnerMiddleware.js";
import {
  createBarber,
  updateBarber,
  getBarberById,
  getShopBarbers,
} from "../controllers/barberController.js";
import barberOwnerMiddleware from "../middleware/barberOwnerMiddleware.js";

const router = express.Router();

// route for creating a barber
router.post(
  "/shops/:shopId/barbers",
  authMiddleware,
  roleMiddleware("shopOwner"),
  shopOwnerMiddleware,
  createBarber,
);

// route for getting all the barbers from a shop.
router.get("/shops/:shopId/barbers", getShopBarbers);

router.get("/barbers/:barberId", getBarberById);

router.put(
  "/barbers/:barberId",
  authMiddleware,
  roleMiddleware("shopOwner"),
  barberOwnerMiddleware,
  updateBarber,
);

export default router;
