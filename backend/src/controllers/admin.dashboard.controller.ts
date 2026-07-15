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

// ===============================
// ORDER STATUS STATS
// ===============================

export const getOrderStatusStats = async(
 req:Request,
 res:Response
):Promise<void>=>{


try{


const status = await Order.aggregate([

{
 $group:{
  _id:"$status",
  count:{
   $sum:1
  }
 }
}

]);



res.status(200).json({

success:true,

status

});



}catch(error:any){


res.status(500).json({

success:false,

message:"Failed",

error:error.message

});


}


};

// ===============================
// TOP SELLING PRODUCTS
// ===============================

export const getTopProducts = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const products =
await Order.aggregate([


{
 $unwind:"$items"
},


{
 $group:{

 _id:"$items.product",

 totalSold:{
  $sum:"$items.quantity"
 }

 }

},


{
 $sort:{
  totalSold:-1
 }
},


{
 $limit:5
},


{
 $lookup:{

 from:"products",

 localField:"_id",

 foreignField:"_id",

 as:"product"

 }

},


{
 $unwind:"$product"
}


]);



res.status(200).json({

success:true,

products

});



}catch(error:any){


res.status(500).json({

success:false,

message:"Failed",

error:error.message

});


}


};

// ===============================
// MONTHLY SALES
// ===============================

export const getMonthlySales = async(
req:Request,
res:Response
):Promise<void>=>{


try{


const sales =
await Order.aggregate([


{
$match:{
paymentStatus:"paid"
}
},



{
$group:{

_id:{
month:{
$month:"$createdAt"
},

year:{
$year:"$createdAt"
}

},


revenue:{
$sum:"$totalPrice"
}

}

},


{
$sort:{
"_id.month":1
}
}


]);



res.status(200).json({

success:true,

sales

});



}catch(error:any){


res.status(500).json({

success:false,

message:"Failed",

error:error.message

});


}


};