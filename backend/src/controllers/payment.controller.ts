import { Request, Response } from "express";
import Payment from "../models/Payment";
import Order from "../models/Order";



// CREATE PAYMENT

export const createPayment = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const userId = (req as any).user._id;


  const {
    orderId,
    method,
    transactionId,
  } = req.body;



  const order = await Order.findById(
    orderId
  );



  if(!order){

    res.status(404).json({

      success:false,

      message:"Order not found",

    });

    return;

  }



  const payment = await Payment.create({

    user:userId,

    order:orderId,

    method,

    transactionId,

    amount:order.totalPrice,

    status:"success",

  });



  await Order.findByIdAndUpdate(

    orderId,

    {

      paymentStatus:"paid",

      paymentMethod:method,

      paymentInfo:{
        transactionId,
        paidAt:new Date(),
      }

    }

  );



  res.status(201).json({

    success:true,

    message:"Payment successful",

    payment,

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Payment failed",

    error:error.message,

  });


 }


};