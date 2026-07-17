import { Request, Response } from "express";
import Payment from "../models/Payment";
import Order from "../models/Order";
import { createSSLPayment } from "../services/sslcommerz.service";

// ===============================
// INITIATE PAYMENT
// ===============================
export const initiatePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      amount,
      transactionId,
      productName,
      customerName,
      email,
      address,
      city,
    } = req.body;

    const payment = await createSSLPayment({
      amount,
      transactionId,
      productName,
      customerName,
      email,
      address,
      city,
    });

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// PAYMENT SUCCESS
// ===============================
export const paymentSuccess = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, transactionId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    if (order.paymentStatus === "paid") {
      res.status(400).json({
        success: false,
        message: "Order already paid",
      });
      return;
    }

    order.paymentStatus = "paid";
    order.orderStatus = "processing";
    order.paymentInfo = {
      transactionId,
      paidAt: new Date(),
    };

    await order.save();

    await Payment.create({
      user: order.user,
      order: order._id,
      method: order.paymentMethod,
      transactionId,
      amount: order.totalPrice,
      status: "success",
    });

    res.status(200).json({
      success: true,
      message: "Payment successful",
      order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// PAYMENT FAILED
// ===============================
export const paymentFail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "failed",
    });

    res.status(200).json({
      success: true,
      message: "Payment failed",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// PAYMENT CANCELLED
// ===============================
export const paymentCancel = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: "Payment cancelled",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};