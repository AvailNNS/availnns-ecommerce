import { Router } from "express";

import {
  create,
  getAll,
  getTree,
  getBySlug,
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


// =========================
// Public Routes
// =========================

router.get(
  "/",
  getAll
);


router.get(
  "/tree",
  getTree
);


router.get(
  "/category/:slug",
  getBySlug
);



// =========================
// Admin Routes
// =========================

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  validate(createCategorySchema),
  create
);



router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  validate(updateCategorySchema),
  update
);



router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  remove
);


export default router;