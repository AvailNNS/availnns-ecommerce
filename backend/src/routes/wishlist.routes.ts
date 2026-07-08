import { Router } from "express";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";

import authMiddleware from "../middleware/auth.middleware";


const router = Router();


// Get User Wishlist
router.get(
  "/",
  authMiddleware,
  getWishlist
);


// Add Product
router.post(
  "/add",
  authMiddleware,
  addToWishlist
);


// Remove Product
router.post(
  "/remove",
  authMiddleware,
  removeFromWishlist
);


export default router;