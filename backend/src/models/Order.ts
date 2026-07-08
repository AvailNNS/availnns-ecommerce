import mongoose, { Schema, Document } from "mongoose";


export interface IOrderItem {

  product: mongoose.Types.ObjectId;

  name:string;

  image:string;

  quantity:number;

  price:number;

}



export interface IOrder extends Document {


  user: mongoose.Types.ObjectId;


  items:IOrderItem[];


  shippingAddress:{

    fullName:string;

    phone:string;
import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  paymentInfo?: {
    transactionId?: string;
    paidAt?: Date;
  };
  paymentStatus?: string;
  orderStatus?: string;
  totalPrice: number;
  discountAmount?: number;
  couponCode?: string;
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
        },
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "BKASH", "NAGAD"],
      default: "COD",
    },
    paymentInfo: {
      transactionId: {
        type: String,
        default: "",
      },
      paidAt: {
        type: Date,
      },
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>("Order", OrderSchema);