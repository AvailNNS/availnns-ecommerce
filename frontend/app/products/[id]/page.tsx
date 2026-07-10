"use client";

import { use, useEffect, useState } from "react";

import { getProductById } from "@/services/product.service";

import { Product } from "@/types/product";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(resolvedParams.id);

      setProduct(data.product);
    };

    fetchProduct();
  }, [resolvedParams.id]);




  if(!product){

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }





  return (

    <main className="py-10">


      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">



        {/* Image */}

        <div className="bg-gray-100 rounded-xl h-96">


          {
            product.images?.[0]?.url &&

            <img

              src={product.images[0].url}

              alt={product.name}

              className="w-full h-full object-cover rounded-xl"

            />

          }


        </div>




        {/* Details */}


        <div>


          <h1 className="text-4xl font-bold">

            {product.name}

          </h1>



          <p className="text-2xl mt-5">

            ${product.price}

          </p>



          <p className="mt-5 text-gray-600">

            {product.description}

          </p>



          <button className="mt-8 bg-black text-white px-8 py-3 rounded-full">

            Add To Cart

          </button>


        </div>



      </div>


    </main>

  );

}