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

router.post(
  "/shops/:shopId/services",
  authMiddleware,
  roleMiddleware("shopOwner"),
  shopOwnerMiddleware,
  createService,
);

router.get("/shops/:shopId/services", getShopServices);

router.put("/services/:serviceId",
  authMiddleware,
  roleMiddleware("shopOwner"),
  serviceOwnerMiddleware,
  updateService
)

router.delete(
  "/services/:serviceId",
  authMiddleware,
  roleMiddleware("shopOwner"),
  serviceOwnerMiddleware,
  deactivateService
)

router.patch(
    "/services/:serviceId/activate",
    authMiddleware,
    roleMiddleware("shopOwner"),
    serviceOwnerMiddleware,
    activateService
);

export default router;
