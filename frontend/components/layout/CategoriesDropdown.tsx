"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

export default function CategoriesDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 font-medium text-gray-600 transition hover:text-black">
        Categories
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border bg-white py-2 shadow-xl">
          {loading ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              Loading...
            </p>
          ) : categories.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              No categories found
            </p>
          ) : (
            categories.map((category) => (
              <Link
                key={category._id}
                href={`/shop?category=${category.slug}`}
                className="block px-4 py-3 transition hover:bg-gray-100"
              >
                {category.name}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}