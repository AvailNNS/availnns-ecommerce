import { Router } from "express";

import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";

import { getMe } from "../controllers/user.controller";

import authMiddleware from "../middleware/auth.middleware";

import validate from "../middleware/validate.middleware";

import {
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth.validator";

const router = Router();

// ===============================
// REGISTER
// ===============================
router.post(
  "/register",
  validate(registerSchema),
  register
);

// ===============================
// LOGIN
// ===============================
router.post(
  "/login",
  login
);

// ===============================
// GET CURRENT USER
// ===============================
router.get(
  "/me",
  authMiddleware,
  getMe
);

// ===============================
// FORGOT PASSWORD
// ===============================
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

// ===============================
// RESET PASSWORD
// ===============================
router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;