import { Request, Response } from "express";
import Coupon from "../models/Coupon";



// ===============================
// CREATE COUPON (ADMIN)
// ===============================

export const createCoupon = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const coupon = await Coupon.create(
    req.body
  );


  res.status(201).json({

    success:true,

    message:"Coupon created successfully",

    coupon,

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Coupon creation failed",

    error:error.message,

  });


 }


};





// ===============================
// GET ALL COUPONS (ADMIN)
// ===============================

export const getCoupons = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const coupons = await Coupon.find()
  .sort({
    createdAt:-1,
  });



  res.status(200).json({

    success:true,

    coupons,

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
// DELETE COUPON
// ===============================

export const deleteCoupon = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  await Coupon.findByIdAndDelete(
    req.params.id
  );


  res.status(200).json({

    success:true,

    message:"Coupon deleted",

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Delete failed",

    error:error.message,

  });


 }


};





// ===============================
// APPLY COUPON
// ===============================

export const applyCoupon = async(
 req:Request,
 res:Response
):Promise<void>=>{


 try{


  const {
    code,
    amount,
  } = req.body;



  const coupon = await Coupon.findOne({

    code:code.toUpperCase(),

    status:"active",

  });



  if(!coupon){

    res.status(404).json({

      success:false,

      message:"Invalid coupon",

    });

    return;

  }



  if(new Date() > coupon.expiryDate){

    res.status(400).json({

      success:false,

      message:"Coupon expired",

    });

    return;

  }



  if(amount < coupon.minimumAmount){

    res.status(400).json({

      success:false,

      message:"Minimum purchase not reached",

    });

    return;

  }



  let discount = 0;



  if(coupon.discountType==="percentage"){

    discount =
      (amount * coupon.discountValue) / 100;

  }
  else{

    discount =
      coupon.discountValue;

  }



  res.status(200).json({

    success:true,

    discount,

    finalAmount:
      amount - discount,

  });



 }catch(error:any){


  res.status(500).json({

    success:false,

    message:"Coupon apply failed",

    error:error.message,

  });

 }
};

// ===============================
// UPDATE COUPON (ADMIN)
// ===============================

export const updateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!coupon) {
      res.status(404).json({
        success:false,
        message:"Coupon not found",
      });
      return;
    }


    res.status(200).json({
      success:true,
      message:"Coupon updated successfully",
      coupon,
    });


  } catch(error:any) {

    res.status(500).json({
      success:false,
      message:"Coupon update failed",
      error:error.message,
    });

  }

};