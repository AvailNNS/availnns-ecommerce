import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes"
import categoryRoutes from "./category.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("./admin", adminRoutes)
router.use("/categories", categoryRoutes);

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AvailNNS API v1 🚀",
  });
});

export default router;