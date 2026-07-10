import api from "@/services/api";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data.data;
};

export const getCategoryTree = async () => {
  const res = await api.get("/categories/tree");
  return res.data.data;
};