import { Router } from "express";


import {
  getDashboardStats,
  getRecentOrders,
  getOrderStatusStats,
  getTopProducts,
  getMonthlySales,
} from "../controllers/admin.dashboard.controller";



import authMiddleware from "../middleware/auth.middleware";

import authorize from "../middleware/role.middleware";



const router = Router();




// ===============================
// DASHBOARD STATS
// ===============================

router.get(

"/stats",

authMiddleware,

authorize("admin"),

getDashboardStats

);







// ===============================
// RECENT ORDERS
// ===============================

router.get(

"/recent-orders",

authMiddleware,

authorize("admin"),

getRecentOrders

);







// ===============================
// ORDER STATUS CHART
// ===============================

router.get(

"/order-status",

authMiddleware,

authorize("admin"),

getOrderStatusStats

);







// ===============================
// TOP SELLING PRODUCTS
// ===============================

router.get(

"/top-products",

authMiddleware,

authorize("admin"),

getTopProducts

);







// ===============================
// MONTHLY SALES CHART
// ===============================

router.get(

"/monthly-sales",

authMiddleware,

authorize("admin"),

getMonthlySales

);






export default router;