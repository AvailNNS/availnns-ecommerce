"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Save, X, Upload, Loader2, Package, ImagePlus, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { getProductById, updateProduct } from "@/services/product.service";
import { getAdminCategories } from "@/services/category.service";
import { Category } from "@/types/category";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [oldImages, setOldImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const [form, setForm] = useState({
    name: "", description: "", brand: "", sku: "", price: "",
    discountPrice: "", stock: "", category: "", tags: "",
    isFeatured: false, isBestSeller: false, isNewArrival: false,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getProductById(id),
          getAdminCategories(localStorage.getItem("token") || "")
        ]);
        
        const product = prodRes.product || prodRes;
        setForm({
          name: product.name || "", 
          description: product.description || "", 
          brand: product.brand || "",
          sku: product.sku || "", 
          price: String(product.price || ""), 
          discountPrice: String(product.discountPrice || ""),
          stock: String(product.stock || ""), 
          category: typeof product.category === "object" ? product.category._id : product.category || "",
          tags: Array.isArray(product.tags) ? product.tags.join(", ") : "", 
          isFeatured: product.isFeatured || false,
          isBestSeller: product.isBestSeller || false, 
          isNewArrival: product.isNewArrival || false,
        });
        setOldImages(product.images || []);
        setCategories(catRes);
      } catch (err) {
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ 
        ...prev, 
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    
    Object.entries(form).forEach(([key, value]) => {
      if (key === "tags") {
        // এরর সমাধান: value কে String হিসেবে কনভার্ট করা হয়েছে
        const tags = String(value)
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        data.append("tags", JSON.stringify(tags));
      } else {
        data.append(key, String(value));
      }
    });

    data.append("oldImages", JSON.stringify(oldImages));
    newImages.forEach(file => data.append("images", file));

    try {
      await updateProduct(id, data, localStorage.getItem("token") || "");
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-xl border"><ChevronLeft /></button>
        <h1 className="text-2xl font-black">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white p-6 rounded-3xl border shadow-sm">
          <h2 className="text-lg font-bold mb-4">Basic Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} />
          </div>
        </section>

        <section className="sticky bottom-0 bg-white p-4 rounded-t-3xl flex justify-end gap-3 border-t">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl hover:bg-gray-100">Cancel</button>
          <button disabled={saving} className="px-8 py-3 rounded-xl bg-black text-white font-bold flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
          </button>
        </section>
      </form>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <input {...props} className="mt-1 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-black" />
    </div>
  );
}