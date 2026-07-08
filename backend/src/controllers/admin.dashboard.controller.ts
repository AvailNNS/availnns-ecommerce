import { Request, Response } from "express";

import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";



// ===============================
// ADMIN DASHBOARD STATS
// ===============================

export const getDashboardStats = async(
  req:Request,
  res:Response
):Promise<void>=>{


 try{


  const totalUsers =
    await User.countDocuments();



  const totalProducts =
    await Product.countDocuments();



  const totalOrders =
    await Order.countDocuments();




  const revenue = await Order.aggregate([

    {
      $match:{
        paymentStatus:"paid",
      }
    },


    {
      $group:{

        _id:null,

        totalRevenue:{
          $sum:"$totalPrice",
        }

      }

    }


  ]);



  const totalRevenue =
    revenue[0]?.totalRevenue || 0;




  res.status(200).json({

    success:true,

    stats:{

      totalUsers,

      totalProducts,

      totalOrders,

      totalRevenue,

    }

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Dashboard stats failed",

    error:error.message,

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