import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes"
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import reviewRoutes from "./review.routes";
import wishlistRoutes from "./wishlist.routes";
import cartRoutes from "./cart.routes";
import orderRoutes from "./order.routes";
import paymentRoutes from "./payment.routes";
import adminOrderRoutes from "./admin.order.routes";
import adminDashboardRoutes from "./admin.dashboard.routes";
import couponRoutes from "./coupon.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);

router.use("/orders", orderRoutes);
router.use("/coupons", couponRoutes);
router.use("/payments", paymentRoutes);

router.use("/admin/dashboard", adminDashboardRoutes);

router.use("/admin/orders", adminOrderRoutes);

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AvailNNS API v1 🚀",
  });
});

export default router;