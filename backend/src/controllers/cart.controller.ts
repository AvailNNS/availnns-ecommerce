import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";


// ===============================
// GET USER CART
// ===============================
export const getCart = async (
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const userId = (req as any).user._id;


    let cart = await Cart.findOne({
      user:userId,
    })
    .populate("items.product");



    if(!cart){

      cart = await Cart.create({

        user:userId,

        items:[],

        total:0,

      });

    }



    res.status(200).json({

      success:true,

      cart,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to get cart",

      error:error.message,

    });


  }


};




// ===============================
// ADD TO CART
// ===============================
export const addToCart = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const userId = (req as any).user._id;


    const {
      productId,
      quantity,
    } = req.body;



    const product = await Product.findById(
      productId
    );



    if(!product){

      res.status(404).json({

        success:false,

        message:"Product not found",

      });

      return;

    }



    let cart = await Cart.findOne({
      user:userId,
    });



    if(!cart){

      cart = await Cart.create({

        user:userId,

        items:[],

        total:0,

      });

    }



    const existingItem = cart.items.find(

      (item:any)=>
        item.product.toString() === productId

    );



    if(existingItem){

      existingItem.quantity += Number(quantity || 1);

    }else{


      cart.items.push({

        product:product._id,

        quantity:Number(quantity || 1),

        price:product.price,

      } as any);


    }



    cart.total = cart.items.reduce(

      (sum,item:any)=>

        sum + (item.price * item.quantity),

      0

    );



    await cart.save();



    res.status(200).json({

      success:true,

      message:"Added to cart",

      cart,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Add cart failed",

      error:error.message,

    });


  }


};




// ===============================
// UPDATE QUANTITY
// ===============================
export const updateCartItem = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const userId = (req as any).user._id;


    const {
      productId,
      quantity,
    } = req.body;



    const cart = await Cart.findOne({
      user:userId,
    });



    if(!cart){

      res.status(404).json({

        success:false,

        message:"Cart not found",

      });

      return;

    }



    const item:any = cart.items.find(

      (item:any)=>

        item.product.toString() === productId

    );



    if(item){

      item.quantity = quantity;

    }



    cart.total = cart.items.reduce(

      (sum,item:any)=>

        sum + item.price * item.quantity,

      0

    );



    await cart.save();



    res.status(200).json({

      success:true,

      cart,

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
// REMOVE CART ITEM
// ===============================
export const removeCartItem = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const userId = (req as any).user._id;


    const {
      productId,
    } = req.body;



    const cart = await Cart.findOne({
      user:userId,
    });



    if(!cart){

      res.status(404).json({

        success:false,

        message:"Cart not found",

      });

      return;

    }



    cart.items = cart.items.filter(

      (item:any)=>

        item.product.toString() !== productId

    );



    cart.total = cart.items.reduce(

      (sum,item:any)=>

        sum + item.price * item.quantity,

      0

    );



    await cart.save();



    res.status(200).json({

      success:true,

      message:"Item removed",

      cart,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Remove failed",

      error:error.message,

    });


  }


};