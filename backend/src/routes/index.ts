import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

import adminRoutes from "./admin.routes";

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

import settingsRoutes from "./settings.route";

import deliveryZoneRoutes from "./deliveryZone.routes";

import dashboardRoutes from "./dashboard.routes";

import uploadRoutes from "./upload.routes";

import notificationRoutes from "./notification.routes";



const router = Router();




// ===============================
// AUTH
// ===============================

router.use(
  "/auth",
  authRoutes
);





// ===============================
// USERS
// ===============================

router.use(
  "/users",
  userRoutes
);





// ===============================
// ADMIN
// ===============================

router.use(
  "/admin",
  adminRoutes
);





// ===============================
// SETTINGS
// ===============================

router.use(
  "/settings",
  settingsRoutes
);





// ===============================
// CATEGORY
// ===============================

router.use(
  "/admin/categories",
  categoryRoutes
);


router.use(
  "/categories",
  categoryRoutes
);





// ===============================
// PRODUCTS
// ===============================

router.use(
  "/admin/products",
  productRoutes
);


router.use(
  "/products",
  productRoutes
);





// ===============================
// CUSTOMER
// ===============================

router.use(
  "/reviews",
  reviewRoutes
);


router.use(
  "/wishlist",
  wishlistRoutes
);


router.use(
  "/cart",
  cartRoutes
);





// ===============================
// USER DASHBOARD
// ===============================

router.use(
  "/dashboard",
  dashboardRoutes
);

router.use(
  "/notifications",
  notificationRoutes
);

// ===============================
// UPLOAD
// ===============================

router.use(
  "/upload",
  uploadRoutes
);





// ===============================
// ORDERS
// ===============================

router.use(
  "/orders",
  orderRoutes
);





// ===============================
// COUPON
// ===============================

router.use(
  "/coupons",
  couponRoutes
);





// ===============================
// PAYMENT
// ===============================

router.use(
  "/payments",
  paymentRoutes
);





// ===============================
// ADMIN DASHBOARD
// ===============================

router.use(
  "/admin/dashboard",
  adminDashboardRoutes
);





// ===============================
// DELIVERY ZONES
// ===============================

router.use(
  "/delivery-zones",
  deliveryZoneRoutes
);





// ===============================
// ADMIN ORDERS
// ===============================

router.use(
  "/admin/orders",
  adminOrderRoutes
);





// ===============================
// API CHECK
// ===============================

router.get(
  "/",
  (_req, res) => {


    res.json({

      success:true,

      message:
      "AvailNNS API v1 🚀",

    });


  }
);



export default router;