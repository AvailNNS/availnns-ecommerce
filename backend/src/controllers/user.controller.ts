import { Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  res.json({
    success: true,
    user: req.user,
  });
};
// ===============================
// UPDATE PROFILE
// ===============================
export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
// ===============================
// CHANGE PASSWORD
// ===============================
export const changePassword = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: error.message,
    });
  }
};

//===============================
// GET ALL USERS (ADMIN)
//===============================

export const getAllUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

//===============================
// GET USER by ID (ADMIN)
//===============================

export const getUserById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

//===============================
// UPDATE USER ROLE (ADMIN)
//===============================

export const updateUserRole = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      res.status(400).json({
        success: false,
        message: "Invalid role",
      });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

//===============================
// DELETE USER (ADMIN)
//===============================

export const deleteUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};