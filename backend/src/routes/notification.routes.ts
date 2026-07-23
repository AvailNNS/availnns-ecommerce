import { Router } from "express";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller";

import authMiddleware from "../middleware/auth.middleware";
// যদি তোমার project-এ export-এর নাম verifyToken হয়, তাহলে:
// import verifyToken from "../middleware/auth.middleware";

const router = Router();

// ===============================
// AUTHENTICATION
// ===============================
router.use(authMiddleware);
// অথবা:
// router.use(verifyToken);

// ===============================
// GET MY NOTIFICATIONS
// ===============================
router.get("/", getNotifications);

// ===============================
// MARK ALL AS READ
// ===============================
router.put("/read-all", markAllAsRead);

// ===============================
// MARK SINGLE AS READ
// ===============================
router.put("/:id/read", markAsRead);

// ===============================
// DELETE NOTIFICATION
// ===============================
router.delete("/:id", deleteNotification);

export default router;