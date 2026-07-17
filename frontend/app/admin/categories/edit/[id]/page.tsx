"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { getAdminCategories, updateCategory } from "@/services/category.service";
import { Category } from "@/types/category";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({ name: "", description: "", parent: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getAdminCategories(token);
        const category = data.find((item: any) => item._id === id);
        
        if (category) {
          setForm({
            name: category.name,
            description: category.description || "",
            parent: category.parent?._id || category.parent || "",
          });
        }
        setCategories(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      await updateCategory(id, { ...form, parent: form.parent || null }, token);
      router.push("/admin/categories");
    } catch (err: any) {
      setError("Failed to update category. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Edit Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Category Name</label>
          <input
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Parent Category</label>
          <select
            name="parent"
            value={form.parent}
            onChange={(e) => setForm({ ...form, parent: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-black outline-none transition-all"
          >
            <option value="">No parent (Top level)</option>
            {categories
              .filter((cat) => cat._id !== id)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>

        <button
          disabled={saving}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <><Loader2 className="animate-spin" size={20} /> Updating...</>
          ) : (
            "Update Category"
          )}
        </button>
      </form>
    </div>
  );
}