import { Router } from "express";

import {
  createPayment,
} from "../controllers/payment.controller";


import authMiddleware from "../middleware/auth.middleware";


const router = Router();


// Create Payment
router.post(
  "/",
  authMiddleware,
  createPayment
);


export default router;