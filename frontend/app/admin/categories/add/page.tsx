"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { createCategory, getAdminCategories } from "@/services/category.service";
import { Category } from "@/types/category";

export default function AddCategoryPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", description: "", parent: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getAdminCategories(token);
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setFetching(false);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      await createCategory({
        ...formData,
        parent: formData.parent || undefined,
      }, token);

      router.push("/admin/categories");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Add New Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Category Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Category Name</label>
          <input
            type="text"
            placeholder="e.g. Electronics"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            required
          />
        </div>

        {/* Parent Category */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Parent Category</label>
          {fetching ? (
            <div className="text-sm text-gray-500">Loading categories...</div>
          ) : (
            <select
              value={formData.parent}
              onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-black outline-none transition-all"
            >
              <option value="">No parent (Top level)</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            placeholder="Enter category details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 className="animate-spin" size={20} /> Creating...</>
          ) : (
            "Create Category"
          )}
        </button>
      </form>
    </div>
  );
}