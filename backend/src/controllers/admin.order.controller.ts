import { Request, Response } from "express";
import Order from "../models/Order";


// ===============================
// GET ALL ORDERS (ADMIN)
// ===============================

export const getAllOrders = async(
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
  });



  res.status(200).json({

    success:true,

    orders,

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Failed to get orders",

    error:error.message,

  });


 }


};




// ===============================
// UPDATE ORDER STATUS
// ===============================

export const updateAdminOrderStatus = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const {
    status,
  } = req.body;



  const order = await Order.findByIdAndUpdate(

    req.params.id,

    {
      orderStatus:status,
    },

    {
      new:true,
    }

  );



  if(!order){

    res.status(404).json({

      success:false,

      message:"Order not found",

    });

    return;

  }



  res.status(200).json({

    success:true,

    message:"Order status updated",

    order,

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Update failed",

    error:error.message,

  });


 }


};




// ===============================
// SALES ANALYTICS
// ===============================

export const getSalesStats = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const totalOrders =
    await Order.countDocuments();



  const revenueResult =
    await Order.aggregate([

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
    revenueResult[0]?.totalRevenue || 0;



  res.status(200).json({

    success:true,

    stats:{

      totalOrders,

      totalRevenue,

    }

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Stats failed",

    error:error.message,

  });


 }


};