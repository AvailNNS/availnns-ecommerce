import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "../types/product.types";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sku: {
      type: String,
      default: "",
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
     type: Boolean,
     default: false,
       },

    isPublished: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  model<IProduct>("Product", productSchema);