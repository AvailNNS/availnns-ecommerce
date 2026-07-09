import { Router } from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} from "../controllers/order.controller";


import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();


// Create Order
router.post(
  "/",
  authMiddleware,
  createOrder
);


// User Orders
router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);


// Single Order
router.get(
  "/:id",
  authMiddleware,
  getOrderById
);
// Cancel Order
router.put(
  "/:id/cancel",
  authMiddleware,
  cancelOrder
);


// Admin Update Status
router.put(
  "/:id/status",
  authMiddleware,
  authorize("admin"),
  updateOrderStatus
);


export default router;