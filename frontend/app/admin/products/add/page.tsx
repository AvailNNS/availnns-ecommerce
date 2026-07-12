"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct } from "@/services/product.service";
import { getAdminCategories } from "@/services/category.service";
import { Category } from "@/types/category";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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

      const productData = new FormData();
      productData.append("name", form.name);
      productData.append("description", form.description);
      productData.append("category", form.category);
      productData.append("price", String(form.price));
      productData.append("stock", String(form.stock));
      productData.append("isFeatured", String(form.isFeatured));
      productData.append("isBestSeller", String(form.isBestSeller));
      productData.append("isNewArrival", String(form.isNewArrival));

      images.forEach((file) => {
        productData.append("images", file);
      });

      await createProduct(productData, token);
      router.push("/admin/products");
    } catch (err: any) {

  console.log("PRODUCT CREATE ERROR:", err);
  console.log("SERVER RESPONSE:", err.response?.data);

  setError(
    err.response?.data?.message || 
    "Product create failed"
  );

} finally {
  setLoading(false);
}
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-5">
        {error && <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>}

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows={5}
          required
        />

        <div className="space-y-4">
          <label className="block text-sm font-medium">Image Gallery</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="rounded-2xl overflow-hidden border">
                  <img src={src} alt={`Preview ${index + 1}`} className="w-full h-36 object-cover" />
                  <div className="flex items-center justify-between p-3 bg-gray-50">
                    <span className="text-sm text-gray-700 truncate">{images[index]?.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg bg-white"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isBestSeller"
              checked={form.isBestSeller}
              onChange={handleChange}
            />
            Best Seller
          </label>
          <label className="flex items-center gap-2">

          <input
            type="checkbox"
          name="isNewArrival"
            checked={form.isNewArrival}
          onChange={handleChange}
            />

        New Arrival

        </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
