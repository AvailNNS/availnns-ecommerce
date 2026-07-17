import CategoryGrid from "@/components/category/CategoryGrid";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-5 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-zinc-900">Categories</h1>
          <p className="mt-3 text-zinc-500">
            Explore our products by category
          </p>
        </div>

        {/* Grid Component */}
        <CategoryGrid />
      </section>
    </main>
  );
}