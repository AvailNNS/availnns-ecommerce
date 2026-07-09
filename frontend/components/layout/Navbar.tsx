"use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
} from "lucide-react";


export default function Navbar() {

  return (

    <header className="border-b bg-white">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">


        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          NOPTRIX
        </Link>



        {/* Search */}

        <div className="hidden md:flex items-center w-[400px] border rounded-full px-4">

          <Search
            size={20}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 outline-none"
          />

        </div>



        {/* Menu */}

        <div className="flex items-center gap-5">


          <Link href="/shop">
            Shop
          </Link>


          <Link href="/wishlist">
            <Heart size={22}/>
          </Link>


          <Link href="/cart">
            <ShoppingCart size={22}/>
          </Link>


          <Link href="/login">
            <User size={22}/>
          </Link>


        </div>


      </div>

    </header>

  );
}