"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ShoppingCart,
  User,
  Heart,
  Home,
  ShoppingBag,
  Grid2X2,
} from "lucide-react";

// Components
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";

// Hooks
import useCart from "@/hooks/useCart";

// Context
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-5">
          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-zinc-600 hover:text-black transition"
          >
            <Menu size={25} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-wide">
            NOPTRIX
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative text-zinc-600 hover:text-red-500 transition group p-1"
            >
              <Heart size={23} className="transition-transform duration-300 group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-zinc-600 hover:text-black transition group p-1"
            >
              <ShoppingCart size={23} className="transition-transform duration-300 group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Account / User Profile Picture */}
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 border-l border-zinc-200 pl-5 text-zinc-700 hover:text-black transition group"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-300 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700 group-hover:scale-105 transition-transform">
                    <User size={18} />
                  </div>
                )}
                <span className="hidden sm:block font-semibold text-sm">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-zinc-600 hover:text-black transition group p-1"
              >
                <User size={23} className="transition-transform duration-300 group-hover:scale-110" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden border-t border-zinc-100 px-6 py-3">
          <SearchBar />
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
