import api from "./api";


export const getProducts = async () => {

  const res = await api.get(
    "/products"
  );

  return res.data;

};



export const getFeaturedProducts = async () => {

  const res = await api.get(
    "/products/featured"
  );

  return res.data;

};

export const getProductById = async (
  id:string
)=>{

  const res = await api.get(
    `/products/${id}`
  );

  return res.data;

};