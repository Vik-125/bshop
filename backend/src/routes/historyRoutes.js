import express from "express";
import {
  getMyHistory,
  updateNotes,
  uploadHistoryPhoto,
  deleteHistoryPhoto
} from "../controllers/historyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", authMiddleware, getMyHistory);

router.patch("/:historyId/notes", authMiddleware, updateNotes);

// For uploading photo in history
router.post(
  "/:historyId/photo",
  authMiddleware,
  upload.single("photo"),
  uploadHistoryPhoto,
);


// For deleting photos 
router.delete(
  "/:historyId/photos",
  authMiddleware,
  deleteHistoryPhoto,
);

export default router;
