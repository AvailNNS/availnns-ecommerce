import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import validate from "../middleware/validate.middleware";
import { registerSchema } from "../validators/auth.validator";

const router = Router();

// Register
router.post(
  "/register",
  validate(registerSchema),
  register
);

// Login
router.post("/login", login);

export default router;