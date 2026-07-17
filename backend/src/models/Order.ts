import mongoose, { Schema, Document } from "mongoose";

// ===============================
// ORDER ITEM
// ===============================
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

// ===============================
// LOCATION
// ===============================
export interface ILocation {
  formattedAddress?: string;
  division?: string;
  district?: string;
  area?: string;
  road?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  googleMapLink?: string;
}

// ===============================
// SHIPPING ADDRESS
// ===============================
export interface IShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  country: string;
  location?: ILocation;
}

// ===============================
// ORDER
// ===============================
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "COD" | "SSLCOMMERZ" | "BKASH" | "NAGAD" | "CARD";
  paymentInfo?: {
    transactionId?: string;
    paidAt?: Date;
  };
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalPrice: number;
  discountAmount: number;
  couponCode: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        image: { type: String, default: "" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      country: { type: String, default: "Bangladesh" },
      location: {
        formattedAddress: { type: String, default: "" },
        division: { type: String, default: "" },
        district: { type: String, default: "" },
        area: { type: String, default: "" },
        road: { type: String, default: "" },
        postalCode: { type: String, default: "" },
        latitude: { type: String, default: "" },
        longitude: { type: String, default: "" },
        googleMapLink: { type: String, default: "" },
      },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "SSLCOMMERZ", "BKASH", "NAGAD", "CARD"],
      default: "COD",
    },
    paymentInfo: {
      transactionId: { type: String, default: "" },
      paidAt: Date,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    couponCode: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", OrderSchema);