"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/services/cart.service";

export default function useCart() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const data = await getCart();
        setCartCount(data.cart.items.length);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCart();
  }, []);

  return {
    cartCount,
  };
}