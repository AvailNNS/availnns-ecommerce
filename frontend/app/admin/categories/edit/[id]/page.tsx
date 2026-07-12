"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getAdminCategories,
  updateCategory,
} from "@/services/category.service";
import { Category } from "@/types/category";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    description: "",
    parent: "",
  });
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
            parent:
              category.parent
                ? typeof category.parent === "string"
                  ? category.parent
                  : category.parent._id || ""
                : "",
          });
        }
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      await updateCategory(id, { ...form, parent: form.parent || null }, token);
      router.push("/admin/categories");
    } catch (error: any) {
      setError("Category update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading category...</div>;
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-5">
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg">{error}</div>}

        <div>
          <label className="block mb-2 font-medium">Category Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Parent Category</label>
          <select
            name="parent"
            value={form.parent}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg bg-white"
          >
            <option value="">No parent</option>
            {categories
              .filter((category) => category._id !== id)
              .map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <button disabled={saving} className="w-full bg-black text-white py-3 rounded-xl">
          {saving ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}
