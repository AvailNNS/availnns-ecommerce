import { Request, Response } from "express";
import Review from "../models/Review";
import Product from "../models/Product";

// ===============================
// CREATE REVIEW
// ===============================
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = (req as any).user._id;

    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (existingReview) {
      res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
      return;
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({ product: productId });
    const averageRating = reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(averageRating.toFixed(1)),
      reviewsCount: reviews.length,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Review failed",
      error: error.message,
    });
  }
};

// ===============================
// GET PRODUCT REVIEWS
// ===============================
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};

// ===============================
// DELETE REVIEW
// ===============================
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      res.status(404).json({
        success: false,
        message: "Review not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Review deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};