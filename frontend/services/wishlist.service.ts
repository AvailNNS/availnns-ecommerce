import api from "./api";

export const getWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

export const addToWishlist = async (productId: string) => {
  const res = await api.post("/wishlist/add", {
    productId,
  });

  return res.data;
};

export const removeFromWishlist = async (productId: string) => {
  const res = await api.post("/wishlist/remove", {
    productId,
  });

  return res.data;
};