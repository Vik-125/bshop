import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createShop,
    getShopId,
    updateShop
 } from "../controllers/shopConroller.js";
import shopOwnerMiddleware from "../middleware/shopOwnerMiddleware.js";


const router = express.Router();

router.post("/",
    authMiddleware,
    roleMiddleware("shopOwner"),
    createShop
);
 
// For discovering a shop.
router.get("/:shopId", getShopId);


// For updating a shops info 
router.put("/:shopId",
    authMiddleware,
    roleMiddleware("shopOwner"),
    shopOwnerMiddleware,
    updateShop
)
export default router;