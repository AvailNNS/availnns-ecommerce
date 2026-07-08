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


    const userId = (req as any).user._id;



    const {
      shippingAddress,
      paymentMethod,
    } = req.body;




    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
      return;
    }

    // CHECK STOCK
    for (const item of cart.items) {
      const product: any = item.product;
      if (product.stock < item.quantity) {
        res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
        return;
      }
    }

    const orderItems = cart.items.map((item: any) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images?.[0]?.url || "",
      quantity: item.quantity,
      price: item.price,
    }));

    // compute total price
    const totalPrice = orderItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // apply coupon if provided
    const { couponCode } = req.body;
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        status: "active",
      });

      if (coupon) {
        if (new Date() < coupon.expiryDate) {
          if (totalPrice >= coupon.minimumAmount) {
            if (coupon.discountType === "percentage") {
              discountAmount = (totalPrice * coupon.discountValue) / 100;
            } else {
              discountAmount = coupon.discountValue;
            }
          }
        }
      }
    }

    const finalPrice = totalPrice - discountAmount;




    const order = await Order.create({

      user:userId,

      items:orderItems,

      shippingAddress,

      paymentMethod,

      totalPrice:finalPrice,
      discountAmount,
      couponCode,

    });
    // REDUCE STOCK

for(const item of cart.items){

  await Product.findByIdAndUpdate(

    item.product._id,

    {
      $inc:{
        stock:-item.quantity
      }
    }

  );

}

    // clear cart after order

    cart.items = [];

    cart.total = 0;

    await cart.save();




    res.status(201).json({

      success:true,

      message:"Order created successfully",

      order,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Order creation failed",

      error:error.message,

    });


  }


};




// ===============================
// GET MY ORDERS
// ===============================
export const getMyOrders = async(
  req:Request,
  res:Response
):Promise<void>=>{


 try{


  const userId = (req as any).user._id;



  const orders = await Order.find({

    user:userId,

  })

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
// GET SINGLE ORDER
// ===============================
export const getOrderById = async(
  req:Request,
  res:Response
):Promise<void>=>{


 try{


  const order = await Order.findById(

    req.params.id

  )
  .populate("user","name email")
  .populate("items.product");



  if(!order){

    res.status(404).json({

      success:false,

      message:"Order not found",

    });

    return;

  }



  res.status(200).json({

    success:true,

    order,

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
// ADMIN UPDATE STATUS
// ===============================
export const updateOrderStatus = async(
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



  res.status(200).json({

    success:true,

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


 