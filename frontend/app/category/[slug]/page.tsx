import { notFound } from "next/navigation";

import ProductGrid from "@/components/product/ProductGrid";
import { getCategoryProducts } from "@/services/product.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const products = await getCategoryProducts(slug);

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12">
        <h1 className="mb-8 text-3xl font-bold capitalize">
          {slug.replaceAll("-", " ")}
        </h1>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}