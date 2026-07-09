import { Router } from "express";

import {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from "../controllers/coupon.controller";


import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();



// =====================
// ADMIN COUPON
// =====================


// Create Coupon
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  createCoupon
);


// Get All Coupon
router.get(
  "/",
  authMiddleware,
  authorize("admin"),
  getCoupons
);

// Update Coupon
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  updateCoupon
);


// Delete Coupon
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteCoupon
);



// =====================
// USER APPLY COUPON
// =====================

router.post(
  "/apply",
  authMiddleware,
  applyCoupon
);



export default router;