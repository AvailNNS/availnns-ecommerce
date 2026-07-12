import { Request, Response } from "express";

import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import Category from "../models/Category";



// ===============================
// ADMIN DASHBOARD STATS
// ===============================

export const getDashboardStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      featuredProducts,
      bestSellerProducts,
      lowStockProducts,
      outOfStockProducts,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments({ isFeatured: true }),
      Product.countDocuments({ isBestSeller: true }),
      Product.countDocuments({
        stock: {
          $gt: 0,
          $lte: 5,
        },
      }),
      Product.countDocuments({
        stock: 0,
      }),
    ]);

    const revenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders,
        totalRevenue,
        featuredProducts,
        bestSellerProducts,
        lowStockProducts,
        outOfStockProducts,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Dashboard stats failed",
      error: error.message,
    });
  }
};


// ===============================
// RECENT ORDERS
// ===============================

export const getRecentOrders = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const orders = await Order.find()

  .populate(
    "user",
    "name email"
  )

  .sort({
    createdAt:-1,
  })

  .limit(10);



  res.status(200).json({

    success:true,

    orders,

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Failed",

    error:error.message,

  });


 }


};