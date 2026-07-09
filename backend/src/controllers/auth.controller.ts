import { Request, Response } from "express";
import User from "../models/User";
import { registerUser, loginUser } from "../services/auth.service";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (

  req: Request,

  res: Response

): Promise<void> => {

  try {

    const data = await loginUser(req.body);

    res.status(200).json({

      success: true,

      message: "Login successful",

      data,

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message,

    });

  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
You requested a password reset.

Click the link below:

${resetUrl}

This link will expire in 15 minutes.
`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to send reset email",
      error: error.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token as string)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
      return;
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Password reset failed",
      error: error.message,
    });
  }
};