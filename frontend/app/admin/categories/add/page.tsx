"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createCategory,
  getAdminCategories,
} from "@/services/category.service";
import { Category } from "@/types/category";

export default function AddCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getAdminCategories(token);
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      const categoryData: any = {
        name,
        description,
      };

      if (parent) {
        categoryData.parent = parent;
      }

      await createCategory(categoryData, token);

      router.push("/admin/categories");
    } catch (err: any) {
      setError(err.response?.data?.message || "Category create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Add Category</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-5">
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-2">Category Name</label>
          <input
            type="text"
            placeholder="Electronics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Parent Category</label>
          <select
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className="w-full border p-3 rounded-lg bg-white"
          >
            <option value="">No parent</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            placeholder="Category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
