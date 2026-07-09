import { Router } from "express";
import bcrypt from "bcryptjs";
import { register, login, forgotPassword, resetPassword } from "../controllers/auth.controller";
import validate from "../middleware/validate.middleware";
import { registerSchema, forgotPasswordSchema, resetPasswordSchema } from "../validators/auth.validator";

const router = Router();

// Register
router.post(
  "/register",
  validate(registerSchema),
  register
);

// Login
router.post("/login", login);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;