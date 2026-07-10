"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { searchProducts } from "@/services/product.service";
import { Product } from "@/types/product";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      setProducts([]);
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchProducts(keyword);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [keyword]);

  return (
    <div className="relative w-full max-w-[420px]">
      <div className="flex items-center rounded-full border px-4">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="w-full bg-transparent px-3 py-2 outline-none"
        />
      </div>

      {keyword ? (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border bg-white shadow-xl">
          {loading ? (
            <p className="p-4 text-sm text-gray-500">Searching...</p>
          ) : products.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No products found</p>
          ) : (
            products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="flex items-center gap-3 border-b p-3 transition hover:bg-gray-50"
              >
                <img
                  src={product.images?.[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${product.discountPrice || product.price}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}