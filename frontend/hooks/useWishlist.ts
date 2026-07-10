"use client";

import { useEffect, useState } from "react";
import { getWishlist } from "@/services/wishlist.service";

export default function useWishlist() {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    async function fetchWishlist() {
      const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

      if (!token) {
        setWishlistCount(0);
        return;
      }

      try {
        const data = await getWishlist();
        setWishlistCount(data.wishlist.products.length);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWishlist();
  }, []);

  return {
    wishlistCount,
  };
}