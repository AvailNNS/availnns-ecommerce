import { Router } from "express";

import {
  sendPhoneOtp,
  verifyPhoneOtp,
} from "../controllers/phoneOtp.controller";

const router = Router();

// ===============================
// SEND PHONE OTP
// POST /api/v1/phone-otp/send
// ===============================
router.post(
  "/send",
  sendPhoneOtp
);

// ===============================
// VERIFY PHONE OTP
// POST /api/v1/phone-otp/verify
// ===============================
router.post(
  "/verify",
  verifyPhoneOtp
);

export default router;