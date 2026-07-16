import { Request, Response } from "express";

import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";
import Coupon from "../models/Coupon";

// ===============================
// CREATE ORDER
// ===============================

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const userId =
      (req as any).user.id;



    const {
      shippingAddress,
      paymentMethod,
      transactionId,
      couponCode
    } = req.body;





    const cart =
      await Cart.findOne({

        user:userId

      })
      .populate("items.product");






    if(
      !cart ||
      cart.items.length === 0
    ){

      res.status(400).json({

        success:false,

        message:"Cart is empty"

      });

      return;

    }







    // =========================
    // CHECK STOCK
    // =========================


    for(
      const item of cart.items
    ){

      const product:any =
        item.product;


      if(
        product.stock < item.quantity
      ){

        res.status(400).json({

          success:false,

          message:
          `${product.name} is out of stock`

        });


        return;

      }


    }









    // =========================
    // ORDER ITEMS
    // =========================


    const orderItems =

    cart.items.map(

      (item:any)=>({


        product:
        item.product._id,


        name:
        item.product.name,


        image:
        item.product.images?.[0]?.url || "",


        quantity:
        item.quantity,


        price:
        item.price



      })

    );









    const subtotal =

    orderItems.reduce(

      (
        sum:number,
        item:any
      )=>

      sum +
      (
        item.price *
        item.quantity
      ),

      0

    );








    // =========================
    // COUPON
    // =========================


    let discountAmount = 0;



    if(couponCode){


      const coupon =

      await Coupon.findOne({

        code:
        couponCode.toUpperCase(),

        status:"active"

      });




      if(coupon){


        if(
          new Date()
          <
          coupon.expiryDate
        ){


          if(
            subtotal >=
            coupon.minimumAmount
          ){



            if(
              coupon.discountType
              ===
              "percentage"
            ){


              discountAmount =

              (
                subtotal *
                coupon.discountValue
              )
              /
              100;


            }
            else{


              discountAmount =
              coupon.discountValue;


            }


          }


        }


      }


    }






    const finalPrice =

    subtotal -
    discountAmount;

    const order = await Order.create({

  user: userId,

  items: orderItems,

  shippingAddress,

  paymentMethod:
    paymentMethod || "COD",

  paymentStatus:
    "pending",

  paymentInfo: {

    transactionId:
      transactionId || "",

  },

  orderStatus:
    "pending",

  totalPrice:
    finalPrice,

  discountAmount,

  couponCode,

});


    // =========================
    // REDUCE STOCK
    // =========================


    for(
      const item of cart.items
    ){


      await Product.findByIdAndUpdate(

        item.product._id,

        {

          $inc:{

            stock:
            -item.quantity

          }

        }

      );


    }








    // =========================
    // CLEAR CART
    // =========================


    cart.items = [];

    cart.total = 0;


    await cart.save();








    res.status(201).json({

      success:true,

      message:
      "Order created successfully",

      order

    });





  }
  catch(error:any){


    console.log(
      "CREATE ORDER ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      "Order creation failed",

      error:
      error.message

    });


  }


};

// ===============================
// GET MY ORDERS
// ===============================

export const getMyOrders = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const userId =
      (req as any).user.id;



    const orders =

    await Order.find({

      user:userId

    })

    .sort({

      createdAt:-1

    });







    res.status(200).json({

      success:true,

      orders

    });





  }
  catch(error:any){


    console.log(
      "GET ORDERS ERROR:",
      error
    );


    res.status(500).json({

      success:false,

      message:
      "Failed to get orders",

      error:
      error.message

    });


  }


};









// ===============================
// GET SINGLE ORDER
// ===============================

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const order =

    await Order.findById(

      req.params.id

    )

    .populate(
      "user",
      "name email"
    )

    .populate(
      "items.product"
    );








    if(!order){


      res.status(404).json({

        success:false,

        message:
        "Order not found"

      });


      return;


    }








    res.status(200).json({

      success:true,

      order

    });







  }
  catch(error:any){


    console.log(
      "GET SINGLE ORDER ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      "Failed to get order",

      error:
      error.message

    });



  }


};




// ===============================
// ADMIN UPDATE ORDER STATUS
// ===============================

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {



    const {
      status
    } = req.body;





    const order =
  await Order.findById(
    req.params.id
  );

if (!order) {

  res.status(404).json({

    success:false,

    message:
      "Order not found",

  });

  return;

}

order.orderStatus =
  status;

if (

  status === "delivered" &&

  order.paymentMethod === "COD"

) {

  order.paymentStatus =
    "paid";

  order.paymentInfo = {

    ...order.paymentInfo,

    paidAt:
      new Date(),

  };

}

await order.save();


    res.status(200).json({

      success:true,

      message:
      "Order status updated",

      order

    });



  }
  catch(error:any){



    console.log(
      "UPDATE ORDER ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      "Update failed",

      error:
      error.message

    });



  }


};

// ===============================
// CANCEL ORDER
// ===============================

export const cancelOrder = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const userId =
      (req as any).user.id;





    const order = await Order.findOne({

      _id:req.params.id,

      user:userId

    });







    if(!order){


      res.status(404).json({

        success:false,

        message:
        "Order not found"

      });


      return;


    }







    if(
      order.orderStatus !== "pending"
    ){


      res.status(400).json({

        success:false,

        message:
        "Order cannot be cancelled"

      });


      return;


    }







    order.orderStatus =
    "cancelled";



    await order.save();







    res.status(200).json({

      success:true,

      message:
      "Order cancelled successfully",

      order

    });







  }
  catch(error:any){


    console.log(
      "CANCEL ORDER ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      "Cancel order failed",

      error:
      error.message

    });


  }


};

// ===============================
// ADMIN GET ALL ORDERS
// ===============================

export const getAdminOrders = async (
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

      orders

    });



  } catch(error:any){


    console.log(
      "GET ADMIN ORDERS ERROR:",
      error
    );


    res.status(500).json({

      success:false,

      message:
      "Failed to get admin orders",

      error:
      error.message

    });


  }

};