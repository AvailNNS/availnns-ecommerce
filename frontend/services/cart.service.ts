import api from "./api";


// =========================
// GET USER CART
// =========================

export const getCart = async () => {

  const res = await api.get(
    "/cart"
  );

  return res.data;

};





// =========================
// ADD TO CART
// =========================

export const addToCart = async (

  productId:string,

  quantity:number = 1

) => {


  const res = await api.post(

    "/cart/add",

    {
      productId,
      quantity,
    }

  );


  return res.data;

};





// =========================
// UPDATE CART
// =========================

export const updateCart = async (

  productId:string,

  quantity:number

) => {


  const res = await api.put(

    "/cart/update",

    {
      productId,
      quantity,
    }

  );


  return res.data;

};





// =========================
// REMOVE ITEM
// =========================

export const removeCartItem = async (

  productId:string

) => {


  const res = await api.post(

    "/cart/remove",

    {
      productId,
    }

  );


  return res.data;

};





// =========================
// CLEAR CART
// =========================

export const clearCart = async()=>{

  const res = await api.delete(
    "/cart/clear"
  );


  return res.data;

};