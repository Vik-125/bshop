import express from "express";
import {
  addFavorite,
  getMyFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add barber to favorite.
router.post("/:barberId", authMiddleware, addFavorite);

// Fetch favorite barber
router.get("/", authMiddleware, getMyFavorites);

// Remove favorite barber
router.delete("/:barberId", authMiddleware, removeFavorite);


export default router;