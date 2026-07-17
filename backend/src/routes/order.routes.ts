import { Router } from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
  getAdminOrders,
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

// ==========================
// ADMIN ORDERS
// MUST BE BEFORE /:id
// ==========================

router.get(
  "/admin",
  authMiddleware,
  authorize("admin"),
  getAdminOrders
);

// Admin Update Status

router.put(
  "/:id/status",
  authMiddleware,
  authorize("admin"),
  updateOrderStatus
);

// Cancel Order

router.put(
  "/:id/cancel",
  authMiddleware,
  cancelOrder
);

// Single Order
// KEEP LAST

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

export default router;