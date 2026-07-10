"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CategoriesDropdown from "./CategoriesDropdown";

export default function Navigation() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `font-medium transition-colors ${
      pathname === href
        ? "border-b-2 border-black pb-4 text-black"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex items-center gap-8 py-4">
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          <li>
            <CategoriesDropdown />
          </li>

          <li>
            <Link href="/shop" className={linkClass("/shop")}>
              Shop
            </Link>
          </li>

          <li>
            <Link
              href="/best-sellers"
              className={linkClass("/best-sellers")}
            >
              Best Sellers
            </Link>
          </li>

          <li>
            <Link
              href="/new-arrivals"
              className={linkClass("/new-arrivals")}
            >
              New Arrivals
            </Link>
          </li>

          <li>
            <Link href="/deals" className={linkClass("/deals")}>
              Deals
            </Link>
          </li>

          <li>
            <Link href="/contact" className={linkClass("/contact")}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}