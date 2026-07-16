import { Router } from "express";

import {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
} from "../controllers/payment.controller";


import authMiddleware from "../middleware/auth.middleware";


const router = Router();



// ===============================
// INITIATE SSL PAYMENT
// ===============================

router.post(
  "/initiate",
  authMiddleware,
  initiatePayment
);



// ===============================
// PAYMENT SUCCESS CALLBACK
// ===============================

router.post(
  "/success",
  paymentSuccess
);



// ===============================
// PAYMENT FAILED CALLBACK
// ===============================

router.post(
  "/fail",
  paymentFail
);



// ===============================
// PAYMENT CANCEL CALLBACK
// ===============================

router.post(
  "/cancel",
  paymentCancel
);



export default router;