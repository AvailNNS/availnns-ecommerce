import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller";
// import verifyToken from "../middleware/auth.middleware"; // আপনার প্রজেক্টের অথ মিডলওয়্যার

const router = Router();

// router.use(verifyToken); // সব রাউটে অথেন্টিকেশন লাগলে

router.get("/", getNotifications);
router.put("/read-all", markAllAsRead);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
