import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  mergeCart,
} from "../controllers/cart.controller";

import authMiddleware from "../middleware/auth.middleware";


const router = Router();



// =========================
// GET USER CART
// =========================

router.get(
  "/",
  authMiddleware,
  getCart
);




// =========================
// ADD PRODUCT
// =========================

router.post(
  "/add",
  authMiddleware,
  addToCart
);




// =========================
// UPDATE QUANTITY
// =========================

router.put(
  "/update",
  authMiddleware,
  updateCartItem
);




// =========================
// REMOVE ITEM
// =========================

router.post(
  "/remove",
  authMiddleware,
  removeCartItem
);




// =========================
// CLEAR CART
// =========================

router.delete(
  "/clear",
  authMiddleware,
  clearCart
);




// =========================
// MERGE GUEST CART
// =========================

router.post(
  "/merge",
  authMiddleware,
  mergeCart
);



export default router;