"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  loading: boolean;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  loading,
}: ProductSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>

          {subtitle && (
            <p className="text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}