import { Request, Response } from "express";
import Wishlist from "../models/Wishlist";


// ===============================
// GET USER WISHLIST
// ===============================
export const getWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const userId = (req as any).user._id;


    let wishlist = await Wishlist.findOne({
      user:userId,
    })
    .populate("products");


    if(!wishlist){

      wishlist = await Wishlist.create({
        user:userId,
        products:[],
      });

    }



    res.status(200).json({

      success:true,

      wishlist,

    });



  } catch(error:any){

    res.status(500).json({

      success:false,

      message:"Failed to get wishlist",

      error:error.message,

    });

  }

};




// ===============================
// ADD PRODUCT TO WISHLIST
// ===============================
export const addToWishlist = async (
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const userId = (req as any).user._id;


    const {
      productId,
    } = req.body;



    let wishlist = await Wishlist.findOne({
      user:userId,
    });



    if(!wishlist){

      wishlist = await Wishlist.create({

        user:userId,

        products:[],

      });

    }



    const exists = wishlist.products.some(

      (id:any)=> id.toString() === productId

    );



    if(exists){

      res.status(400).json({

        success:false,

        message:"Product already in wishlist",

      });

      return;

    }



    wishlist.products.push(productId);


    await wishlist.save();



    res.status(200).json({

      success:true,

      message:"Added to wishlist",

      wishlist,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to add wishlist",

      error:error.message,

    });


  }


};




// ===============================
// REMOVE FROM WISHLIST
// ===============================
export const removeFromWishlist = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const userId = (req as any).user._id;


    const {
      productId,
    } = req.body;



    const wishlist = await Wishlist.findOne({
      user:userId,
    });



    if(!wishlist){

      res.status(404).json({

        success:false,

        message:"Wishlist not found",

      });

      return;

    }



    wishlist.products =
      wishlist.products.filter(

        (id:any)=>
          id.toString() !== productId

      );



    await wishlist.save();



    res.status(200).json({

      success:true,

      message:"Removed from wishlist",

      wishlist,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Remove failed",

      error:error.message,

    });


  }


};