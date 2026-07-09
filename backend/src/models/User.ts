import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    resetPasswordToken: {
  type: String,
  default: null,
},

resetPasswordExpire: {
  type: Date,
  default: null,
},

  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);