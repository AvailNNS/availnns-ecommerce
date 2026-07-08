import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controller";

import authMiddleware from "../middleware/auth.middleware";


const router = Router();


// Get User Cart
router.get(
  "/",
  authMiddleware,
  getCart
);


// Add Product
router.post(
  "/add",
  authMiddleware,
  addToCart
);


// Update Quantity
router.put(
  "/update",
  authMiddleware,
  updateCartItem
);


// Remove Item
router.post(
  "/remove",
  authMiddleware,
  removeCartItem
);


export default router;