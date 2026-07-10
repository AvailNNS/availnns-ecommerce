import api from "@/services/api";
import { Product } from "@/types/product";

export const searchProducts = async (
  keyword: string
): Promise<Product[]> => {
  const res = await api.get(
    `/products/search?q=${encodeURIComponent(keyword)}`
  );

  return res.data.data;
};