import { Request, Response } from "express";

import PhoneOtp from "../models/PhoneOtp";

import { generateOtp } from "../utils/generateOtp";


// ===============================
// SEND OTP
// ===============================

export const sendPhoneOtp = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      phone,
      purpose = "register",
    } = req.body;


    if (!phone) {

      res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });

      return;

    }


    // Remove old OTP

    await PhoneOtp.deleteMany({
      phone,
      purpose,
    });


    // Generate OTP

    const otp =
      generateOtp();


    // Expire after 5 minutes

    const expiresAt =
      new Date(
        Date.now() + 5 * 60 * 1000
      );


    // Save OTP

    await PhoneOtp.create({

      phone,

      otp,

      purpose,

      expiresAt,

      verified: false,

      attempts: 0,

    });


    // Development Mode

    if (
      process.env.NODE_ENV ===
      "development"
    ) {

      console.log("");

      console.log("========================");
      console.log("PHONE :", phone);
      console.log("OTP   :", otp);
      console.log("========================");

      console.log("");

    }


    res.status(200).json({

      success: true,

      message:
        "OTP sent successfully.",

      otp:
        process.env.NODE_ENV ===
        "development"
          ? otp
          : undefined,

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message:
        error.message ||
        "Internal Server Error",

    });

  }

};

// ===============================
// VERIFY OTP
// ===============================

export const verifyPhoneOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      phone,
      otp,
      purpose = "register",
    } = req.body;

    if (!phone || !otp) {
      res.status(400).json({
        success: false,
        message: "Phone number and OTP are required.",
      });
      return;
    }

    const otpDoc = await PhoneOtp.findOne({
      phone,
      purpose,
    });

    if (!otpDoc) {
      res.status(404).json({
        success: false,
        message: "OTP not found.",
      });
      return;
    }

    // Check Expiry
    if (otpDoc.expiresAt.getTime() < Date.now()) {
      await PhoneOtp.deleteOne({
        _id: otpDoc._id,
      });

      res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
      return;
    }

    // Wrong OTP
    if (otpDoc.otp !== otp) {
      otpDoc.attempts += 1;
      await otpDoc.save();

      res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
      return;
    }

    // Verified
    otpDoc.verified = true;
    await otpDoc.save();

    res.status(200).json({
      success: true,
      message: "Phone verified successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};