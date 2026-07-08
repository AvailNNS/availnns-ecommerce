import { Request, Response } from "express";
import Product from "../models/Product";
import { generateSlug } from "../utils/slug";


// ===============================
// CREATE PRODUCT
// ===============================
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const slug =
      typeof req.body.slug === "string" && req.body.slug.trim()
        ? req.body.slug.trim()
        : generateSlug(req.body.name || "");



    const uploadedFiles = Array.isArray(req.files)
      ? req.files
      : req.file
        ? [req.file]
        : [];

    const images = uploadedFiles.map((file: any) => ({
      url: file.path || file.secure_url || "",
      public_id: file.filename || file.public_id || "",
    }));



    const product = await Product.create({

      ...req.body,

      slug,

      ...(images.length > 0 ? { images } : {}),

    });



    res.status(201).json({

      success:true,

      message:"Product created successfully",

      product,

    });



  } catch(error:any){
    console.error("Product creation failed:", error);

    res.status(500).json({

      success:false,

      message:"Product creation failed",

      error:error.message || error,

    });

  }

};




// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {


  try {


    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;



    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;



    const filter:any = {};



    // Search

    if(search){

      filter.name = {

        $regex: search,

        $options:"i",

      };

    }



    // Category

    if(category){

      filter.category = category;

    }



    // Price

    if(minPrice || maxPrice){

      filter.price = {};


      if(minPrice){

        filter.price.$gte = Number(minPrice);

      }


      if(maxPrice){

        filter.price.$lte = Number(maxPrice);

      }

    }



    // Sorting

    let sortOption:any = {

      createdAt:-1,

    };



    if(sort === "price_asc"){

      sortOption = {

        price:1,

      };

    }



    if(sort === "price_desc"){

      sortOption = {

        price:-1,

      };

    }



    if(sort === "name_asc"){

      sortOption = {

        name:1,

      };

    }



    if(sort === "name_desc"){

      sortOption = {

        name:-1,

      };

    }




    const products = await Product.find(filter)

      .populate("category")

      .skip(skip)

      .limit(limit)

      .sort(sortOption);




    const total = await Product.countDocuments(filter);



    res.status(200).json({

      success:true,

      products,

      pagination:{

        total,

        page,

        totalPages:Math.ceil(total / limit),

      }

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to get products",

      error:error.message,

    });


  }


};




// ===============================
// GET PRODUCT BY ID
// ===============================

export const getProductById = async (
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const product = await Product.findById(
      req.params.id
    )
    .populate("category");



    if(!product){

      res.status(404).json({

        success:false,

        message:"Product not found",

      });

      return;

    }



    res.status(200).json({

      success:true,

      product,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to fetch product",

      error:error.message,

    });


  }


};




// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const data:any = {

      ...req.body,

    };



    if(req.body.name){

      data.slug = generateSlug(
        req.body.name
      );

    }



    const product = await Product.findByIdAndUpdate(

      req.params.id,

      data,

      {
        new:true,
      }

    );



    if(!product){

      res.status(404).json({

        success:false,

        message:"Product not found",

      });

      return;

    }



    res.status(200).json({

      success:true,

      product,

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
// DELETE PRODUCT
// ===============================

export const deleteProduct = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const product = await Product.findByIdAndDelete(
      req.params.id
    );



    if(!product){

      res.status(404).json({

        success:false,

        message:"Product not found",

      });

      return;

    }



    res.status(200).json({

      success:true,

      message:"Product deleted",

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
// FEATURED PRODUCTS
// ===============================

export const getFeaturedProducts = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const products = await Product.find({

      featured:true,

      status:"active",

    })

    .populate("category")

    .limit(10)

    .sort({

      createdAt:-1,

    });



    res.status(200).json({

      success:true,

      products,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to get featured products",

      error:error.message,

    });


  }


};




// ===============================
// RELATED PRODUCTS
// ===============================

export const getRelatedProducts = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const product = await Product.findById(
      req.params.id
    );



    if(!product){

      res.status(404).json({

        success:false,

        message:"Product not found",

      });

      return;

    }



    const products = await Product.find({

      category:product.category,

      _id:{
        $ne:req.params.id,
      },

      status:"active",

    })

    .populate("category")

    .limit(6)

    .sort({

      createdAt:-1,

    });



    res.status(200).json({

      success:true,

      products,

    });



  }catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to get related products",

      error:error.message,

    });


  }


};

// ===============================
// UPDATE STOCK (ADMIN)
// ===============================

export const updateStock = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { stock } = req.body;


    const product = await Product.findByIdAndUpdate(

      req.params.id,

      {
        stock: Number(stock),
      },

      {
        new:true,
      }

    );


    if(!product){

      res.status(404).json({

        success:false,

        message:"Product not found",

      });

      return;

    }


    res.status(200).json({

      success:true,

      message:"Stock updated successfully",

      product,

    });



  } catch(error:any){

    res.status(500).json({

      success:false,

      message:"Stock update failed",

      error:error.message,

    });

  }

};




// ===============================
// LOW STOCK PRODUCTS
// ===============================

export const getLowStockProducts = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {


    const products = await Product.find({

      stock:{
        $lte:5,
      }

    })
    .populate("category");


    res.status(200).json({

      success:true,

      products,

    });



  } catch(error:any){


    res.status(500).json({

      success:false,

      message:"Failed to get low stock products",

      error:error.message,

    });


  }

};