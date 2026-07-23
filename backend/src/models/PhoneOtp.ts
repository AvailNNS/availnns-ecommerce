import { Schema, model, Document } from "mongoose";

export interface IPhoneOtp extends Document {
  phone: string;
  otp: string;
  purpose: "register" | "login" | "reset-password";
  expiresAt: Date;
  verified: boolean;
  attempts: number;
}

const phoneOtpSchema = new Schema<IPhoneOtp>(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["register", "login", "reset-password"],
      default: "register",
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Auto delete expired OTP
phoneOtpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export default model<IPhoneOtp>(
  "PhoneOtp",
  phoneOtpSchema
);