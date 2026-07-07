import { Request, Response } from "express";

export const adminDashboard = (
  _req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Welcome Admin 🚀",
  });
};