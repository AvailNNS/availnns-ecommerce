import { Request, Response, NextFunction } from "express";
import Notification from "../models/notification";

// Request ইন্টারফেসে user প্রপার্টি না থাকলে কাস্টম টাইপ এক্সটেন্ড করে নিতে পারেন
interface AuthRequest extends Request {
  user?: {
    _id: string;
  };
}

// Get all notifications for logged-in user
export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    next(error);
  }
};

// Mark single notification as read
export const markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    next(error);
  }
};

// Mark all as read
export const markAllAsRead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?._id;
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    next(error);
  }
};

// Delete notification
export const deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
