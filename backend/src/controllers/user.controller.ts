import { Response } from "express";
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