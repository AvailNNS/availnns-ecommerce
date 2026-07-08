import { Router } from "express";

import {
  getAllOrders,
  updateAdminOrderStatus,
  getSalesStats,
} from "../controllers/admin.order.controller";


import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();


// Get All Orders
router.get(
  "/",
  authMiddleware,
  authorize("admin"),
  getAllOrders
);


// Sales Statistics
router.get(
  "/stats",
  authMiddleware,
  authorize("admin"),
  getSalesStats
);


// Update Status
router.put(
  "/:id/status",
  authMiddleware,
  authorize("admin"),
  updateAdminOrderStatus
);



export default router;