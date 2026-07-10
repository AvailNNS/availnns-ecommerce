import api from "@/services/api";
import { Product } from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data.products;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products/featured");
  return res.data.products;
};

export const getBestSellerProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products/best-sellers");
  return res.data.products;
};

export const getRelatedProducts = async (
  id: string
): Promise<Product[]> => {
  const res = await api.get(`/products/${id}/related`);
  return res.data.products;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const searchProducts = async (
  search: string
): Promise<Product[]> => {
  const res = await api.get(
    `/products?search=${encodeURIComponent(search)}`
  );

  return res.data.products;
};