import api from "@/services/api";
import { Category } from "@/types/category";


// =========================
// PUBLIC CATEGORY
// =========================


export const getCategories = async (): Promise<Category[]> => {

  const res = await api.get(
    "/categories"
  );

  return res.data.data;

};





export const getCategoryTree = async () => {

  const res = await api.get(
    "/categories/tree"
  );

  return res.data.data;

};





export const getCategoryBySlug = async (
  slug: string
) => {

  const res = await api.get(
    `/categories/category/${slug}`
  );

  return res.data.data;

};





// =========================
// ADMIN CATEGORY MANAGEMENT
// =========================



export const getAdminCategories = async (
  token: string
) => {


  const res = await api.get(

    "/admin/categories",

    {

      headers: {

        Authorization:
          `Bearer ${token}`,

      },

    }

  );


  return res.data.data || [];


};







export const createCategory = async (

  categoryData: any,

  token: string

) => {


  const res = await api.post(

    "/admin/categories",

    categoryData,

    {

      headers: {

        Authorization:
          `Bearer ${token}`,

      },

    }

  );


  return res.data;


};







export const updateCategory = async (

  id: string,

  categoryData: any,

  token: string

) => {


  const res = await api.put(

    `/admin/categories/${id}`,

    categoryData,

    {

      headers: {

        Authorization:
          `Bearer ${token}`,

      },

    }

  );


  return res.data;


};







export const removeCategory = async (

  id: string,

  token: string

) => {


  const res = await api.delete(

    `/admin/categories/${id}`,

    {

      headers: {

        Authorization:
          `Bearer ${token}`,

      },

    }

  );


  return res.data;


};