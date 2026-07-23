"use client";

import { ReactNode } from "react";

import ReduxProvider from "./ReduxProvider";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CurrencyProvider } from "@/context/CurrencyContext";


export default function AppProvider({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <ReduxProvider>

      <AuthProvider>

        <CartProvider>

          <WishlistProvider>

            <CurrencyProvider>

              {children}

            </CurrencyProvider>

          </WishlistProvider>

        </CartProvider>

      </AuthProvider>

    </ReduxProvider>

  );

}