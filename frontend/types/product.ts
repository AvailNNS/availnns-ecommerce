export interface ProductImage {
  url: string;
  public_id: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;

  category: string;

  brand: string;

  price: number;
  discountPrice: number;

  stock: number;

  sku: string;

  images: ProductImage[];

  isFeatured: boolean;
  isBestSeller: boolean;
  isPublished: boolean;

  rating: number;
  numReviews: number;

  tags: string[];

  createdAt: string;
  updatedAt: string;
}