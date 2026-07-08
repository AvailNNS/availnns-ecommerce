import slugify from "slugify";
import Category from "../models/Category";

export const createCategory = async (data: any) => {
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
  });

  const exists = await Category.findOne({ slug });

  if (exists) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    ...data,
    slug,
  });

  return category;
};

export const getCategories = async () => {
  const categories = await Category.find()
    .populate("parent", "name slug")
    .sort({ createdAt: -1 });

  return categories;
};

export const updateCategory = async (
  id: string,
  data: any
) => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};