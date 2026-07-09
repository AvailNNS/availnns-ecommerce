import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import {
  getMe,
  updateProfile,
  changePassword,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

// ===============================
// USER ROUTES
// ===============================

router.get("/me", authMiddleware, getMe);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

// ===============================
// ADMIN ROUTES
// ===============================

router.get(
  "/",
  authMiddleware,
  authorize("admin"),
  getAllUsers
);

router.get(
  "/:id",
  authMiddleware,
  authorize("admin"),
  getUserById
);

router.put(
  "/:id/role",
  authMiddleware,
  authorize("admin"),
  updateUserRole
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteUser
);

export default router;