import { Request, Response } from "express";

const notFound = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
};

export default notFound;