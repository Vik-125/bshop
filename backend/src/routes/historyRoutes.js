import express from "express";
import {
  getMyHistory,
  updateNotes,
} from "../controllers/historyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMyHistory);

router.patch("/:historyId/notes", authMiddleware, updateNotes);

export default router;