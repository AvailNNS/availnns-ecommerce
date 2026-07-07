import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";
import { adminDashboard } from "../controllers/admin.controller";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorize("admin"),
  adminDashboard
);

export default router;