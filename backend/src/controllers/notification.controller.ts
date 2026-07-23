import { Response, NextFunction } from "express";
import Notification from "../models/notification";
import { AuthRequest } from "../middleware/auth.middleware";

// ===============================
// GET MY NOTIFICATIONS
// ===============================
export const getNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const notifications = await Notification.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// MARK SINGLE AS READ
// ===============================
export const markAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await Notification.findOneAndUpdate(
      {
        _id: id,
        userId: req.user?.id,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// MARK ALL AS READ
// ===============================
export const markAllAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Notification.updateMany(
      {
        userId: req.user?.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// DELETE NOTIFICATION
// ===============================
export const deleteNotification = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await Notification.findOneAndDelete({
      _id: id,
      userId: req.user?.id,
    });

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};