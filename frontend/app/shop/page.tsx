"use client";


import { useEffect, useState } from "react";

import { getProducts } from "@/services/product.service";

import { Product } from "@/types/product";

import ProductCard from "@/components/product/ProductCard";



export default function ShopPage(){


  const [products,setProducts] = useState<Product[]>([]);


  useEffect(()=>{


    const fetchProducts = async()=>{

      try{

        const data = await getProducts();

        setProducts(
          data.products || []
        );


      }catch(error){

        console.log(error);

      }


    };


    fetchProducts();


  },[]);



  return (

    <main className="py-10">


      <div className="max-w-7xl mx-auto px-6">


        <h1 className="text-4xl font-bold mb-8">
          Shop Products
        </h1>



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">


          {
            products.map((product)=>(

              <ProductCard

                key={product._id}

                product={product}

              />

            ))
          }


        </div>



      </div>


    </main>

  );

}