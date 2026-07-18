import { Request, Response } from "express";
import DeliveryZone from "../models/DeliveryZone";

export const createDeliveryZone = async (
  req: Request,
  res: Response
) => {
  try {
    const zone = await DeliveryZone.create(req.body);

    res.status(201).json({
      success: true,
      zone,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDeliveryZones = async (
  req: Request,
  res: Response
) => {
  try {
    const zones = await DeliveryZone.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      zones,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDeliveryZone = async (
  req: Request,
  res: Response
) => {
  try {
    const zone =
      await DeliveryZone.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json({
      success: true,
      zone,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDeliveryZone = async (
  req: Request,
  res: Response
) => {
  try {
    await DeliveryZone.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Zone deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};