import { Router } from "express";

import {
  getDashboardStats,
  getRecentOrders,
} from "../controllers/admin.dashboard.controller";


import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();


// Dashboard Stats
router.get(
  "/stats",
  authMiddleware,
  authorize("admin"),
  getDashboardStats
);


// Recent Orders
router.get(
  "/recent-orders",
  authMiddleware,
  authorize("admin"),
  getRecentOrders
);


export default router;