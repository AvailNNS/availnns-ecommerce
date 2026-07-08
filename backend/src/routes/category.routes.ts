import { Router } from "express";
import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/category.controller";

import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";
import validate from "../middleware/validate";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";

const router = Router();

// Public Routes
router.get("/", getAll);

// Create Category
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(createCategorySchema),
  create
);

// Update Category
router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(updateCategorySchema),
  update
);

// Delete Category
router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  remove
);

export default router;