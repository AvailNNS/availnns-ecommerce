import { Request, Response } from "express";
import Order from "../models/Order";
import sendEmail from "../utils/sendEmail";

// ===============================
// GET ALL ORDERS (ADMIN)
// ===============================

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const orders = await Order.find()
      .populate(
        "user",
        "name email"
      )
      .sort({
        createdAt:-1
      });

    res.status(200).json({

      success:true,

      orders,

    });

  } catch(error:any){

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

export const updateAdminOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      status
    } = req.body;

    const order =
    await Order.findByIdAndUpdate(

      req.params.id,

      {
        orderStatus:status
      },

      {
        returnDocument:"after"
      }

    );

    if(order){

  const updatedOrder =
  await Order.findById(order._id)
  .populate(
    "user",
    "name email"
  );


  const user:any = updatedOrder?.user;


  if(user?.email){

    try{

      await sendEmail({

        email:user.email,

        subject:"Order Status Updated",

        message:`
        Hello ${user.name},

        Your order status has been updated.

        Order ID:
        ${order._id}

        Status:
        ${status}

        Thank you for shopping with AvailNNS.
        `

      });


    }
    catch(emailError){

      console.log(
        "Email sending failed:",
        emailError
      );

    }

  }

}

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

  }
  catch(error:any){

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

export const getSalesStats = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const totalOrders =
    await Order.countDocuments();

    const revenueResult =
    await Order.aggregate([

      {

        $group:{

          _id:null,

          totalRevenue:{

            $sum:"$totalPrice"

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

      },

    });

  }
  catch(error:any){

    res.status(500).json({

      success:false,

      message:"Stats failed",

      error:error.message,

    });

  }

};

// ===============================
// UPDATE PAYMENT METHOD
// ===============================

export const updateAdminPaymentMethod = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      paymentMethod
    } = req.body;

    const order =
    await Order.findByIdAndUpdate(

      req.params.id,

      {
        paymentMethod
      },

      {
        returnDocument:"after"
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

      message:"Payment method updated",

      order,

    });

  }
  catch(error:any){

    res.status(500).json({

      success:false,

      message:"Payment update failed",

      error:error.message,

    });

  }

};