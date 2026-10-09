import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import shopOwnerMiddleware from "../middleware/shopOwnerMiddleware.js";
import {
  createService,
  deactivateService,
  getShopServices,
  updateService,
  activateService,
} from "../controllers/serviceControllers.js";
import serviceOwnerMiddleware from "../middleware/serviceOwnerMiddleware.js";

const router = express.Router();

// For creating a service
router.post(
  "/shops/:shopId/services",
  authMiddleware,
  roleMiddleware("shopOwner"),
  shopOwnerMiddleware,
  createService,
);

// For fetching all the services from a shop.
router.get("/shops/:shopId/services", getShopServices);

// For updating a service
router.put(
  "/services/:serviceId",
  authMiddleware,
  roleMiddleware("shopOwner"),
  serviceOwnerMiddleware,
  updateService,
);

// For deactivating a service.
router.delete(
  "/services/:serviceId",
  authMiddleware,
  roleMiddleware("shopOwner"),
  serviceOwnerMiddleware,
  deactivateService,
);

// For activating a service
router.patch(
  "/services/:serviceId/activate",
  authMiddleware,
  roleMiddleware("shopOwner"),
  serviceOwnerMiddleware,
  activateService,
);

export default router;
