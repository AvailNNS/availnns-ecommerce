import mongoose from "mongoose";

const deliveryZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },

    freeDeliveryAbove: {
      type: Number,
      default: 0,
    },

    estimatedDays: {
      type: String,
      default: "2-5 Days",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "DeliveryZone",
  deliveryZoneSchema
);