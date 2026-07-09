import { Types } from "mongoose";

export interface IProductImage {
  url: string;
  public_id: string;
}

export interface IProduct {
  name: string;
  slug: string;
  description: string;

  category: Types.ObjectId;

  brand?: string;

  price: number;
  discountPrice?: number;

  stock: number;
  sku?: string;

  images: IProductImage[];

  isFeatured: boolean;
  isBestSeller: boolean;
  isPublished: boolean;

  rating: number;
  numReviews: number;

  tags?: string[];
}