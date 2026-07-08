import { Router } from "express";

import {
  createReview,
  getProductReviews,
  deleteReview,
} from "../controllers/review.controller";

import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();


// Create Review (Login User)
router.post(
  "/",
  authMiddleware,
  createReview
);


// Get Product Reviews (Public)
router.get(
  "/product/:productId",
  getProductReviews
);


// Delete Review (Admin)
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteReview
);


export default router;
