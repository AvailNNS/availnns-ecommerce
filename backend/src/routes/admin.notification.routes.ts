import { Router, Request, Response } from "express";
import Notification from "../models/notification";
import User from "../models/User";

const router = Router();

// ===============================
// SEND NOTIFICATION
// POST /api/admin/notifications/send
// ===============================
router.post(
  "/send",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const {
        title,
        message,
        type = "system",
        link = "",
        recipientType,
        userId,
      } = req.body;

      // Validation
      if (!title || !message) {
        return res.status(400).json({
          success: false,
          message: "Title and message are required.",
        });
      }

      // Send to all users
      if (recipientType === "all") {
        const users = await User.find({}, "_id");

        if (!users.length) {
          return res.status(404).json({
            success: false,
            message: "No users found.",
          });
        }

        const notifications = users.map((user) => ({
          userId: user._id,
          title,
          message,
          type,
          link,
        }));

        await Notification.insertMany(notifications);

        return res.status(200).json({
          success: true,
          message: `${notifications.length} notifications sent successfully.`,
        });
      }

      // Send to single user
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required.",
        });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      await Notification.create({
        userId,
        title,
        message,
        type,
        link,
      });

      return res.status(200).json({
        success: true,
        message: "Notification sent successfully.",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }
);

export default router;