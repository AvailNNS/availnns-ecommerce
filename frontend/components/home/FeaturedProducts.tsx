"use client";

import { useEffect, useState } from "react";

import { getFeaturedProducts } from "@/services/product.service";
import { Product } from "@/types/product";

import ProductCard from "@/components/product/ProductCard";


export default function FeaturedProducts() {


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getFeaturedProducts();

        setProducts(
          data || []
        );


      } catch (error) {

        console.log(
          "Featured products error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();


  }, []);




  if (loading) {

    return (

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>


          <p className="mt-5">
            Loading...
          </p>


        </div>

      </section>

    );

  }





  return (

    <section className="py-16">


      <div className="max-w-7xl mx-auto px-6">



        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>




        {
          products.length === 0 ? (

            <p>
              No products found
            </p>


          ) : (


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


          )
        }




      </div>


    </section>

  );

}