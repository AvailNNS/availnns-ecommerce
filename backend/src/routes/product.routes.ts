import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockProducts,
  getFeaturedProducts,
  getBestSellerProducts,
  getRelatedProducts,
} from "../controllers/product.controller";

import upload from "../middleware/upload.middleware";
import validate from "../middleware/validate";
import { createProductSchema } from "../validators/product.validator";

import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();


// Admin
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  upload.array("images", 10),
  validate(createProductSchema),
  createProduct
);


router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  updateProduct
);


router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteProduct
);

router.put(
 "/:id/stock",
 authMiddleware,
 authorize("admin"),
 updateStock
);


router.get(
 "/admin/low-stock",
 authMiddleware,
 authorize("admin"),
 getLowStockProducts
);

// Public
router.get(
  "/featured",
  getFeaturedProducts
);

router.get(
  "/best-sellers",
  getBestSellerProducts
);

router.get(
  "/:id/related",
  getRelatedProducts
);
router.get("/", getProducts);

router.get("/:id", getProductById);


export default router;