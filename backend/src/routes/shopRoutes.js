import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createShop,
    getShopId,
    updateShop,
    getMyShops
 } from "../controllers/shopController.js";
import shopOwnerMiddleware from "../middleware/shopOwnerMiddleware.js";


const router = express.Router();

router.post("/",
    authMiddleware,
    roleMiddleware("shopOwner"),
    createShop
);

// fetching all the shops related to a paticular owner
router.get("/my-shops",
    authMiddleware,
    roleMiddleware("shopOwner"),
    getMyShops
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