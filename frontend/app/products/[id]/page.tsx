"use client";


import { use, useEffect, useState } from "react";


import {
  getProductById,
  getRelatedProducts,
  getNewArrivalProducts

} from "@/services/product.service";


import { Product } from "@/types/product";


import ProductGallery from "@/components/product/ProductGallery";

import ProductInfo from "@/components/product/ProductInfo";

import ProductSection from "@/components/product/ProductSection";





export default function ProductDetailsPage({

  params

}:{

  params: Promise<{
    id:string
  }>;

}){



  const resolvedParams = use(params);




  const [product,setProduct] =
    useState<Product | null>(null);



  const [related,setRelated] =
    useState<Product[]>([]);



  const [recent,setRecent] =
    useState<Product[]>([]);





  useEffect(()=>{


    const loadProduct = async()=>{


      try{


        // Get single product

        const productData =
          await getProductById(
            resolvedParams.id
          );



        setProduct(
          productData.product
        );






        // Get related products

        const relatedData =
          await getRelatedProducts(
            resolvedParams.id
          );



        setRelated(
          relatedData
        );







        // Get new arrivals

        const newArrivalData =
          await getNewArrivalProducts();



        setRecent(

          newArrivalData.filter(

            (item:Product)=>

              item._id !== resolvedParams.id

          )

        );





      }catch(error){


        console.log(
          "Product details error:",
          error
        );


      }


    };



    loadProduct();



  },[resolvedParams.id]);







  if(!product){


    return (

      <div className="p-10">

        Loading...

      </div>

    );


  }







  return (

    <main
      className="
      bg-gray-50
      min-h-screen
      py-10
      "
    >



      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >



        {/* Breadcrumb */}

        <p
          className="
          text-sm
          text-gray-500
          mb-6
          "
        >

          Home / Products / {product.name}

        </p>







        {/* Product Details */}

        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          "
        >



          <ProductGallery

            product={product}

          />





          <ProductInfo

            product={product}

          />



        </div>








        {/* Related Products */}

        <ProductSection

          title="Related Products"

          products={related}

        />








        {/* New Arrivals */}

        <ProductSection

          title="New Arrivals"

          products={recent.slice(0,4)}

        />





      </div>



    </main>

  );


}