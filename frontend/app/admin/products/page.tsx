"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getAdminProducts,
  removeProduct,
} from "@/services/product.service";


export default function AdminProductsPage() {


  const [products,setProducts] =
    useState<any[]>([]);


  const [loading,setLoading] =
    useState(true);




  const fetchProducts = async()=>{


    try{


      const token =
        localStorage.getItem("token");


      if(!token) return;



      const data =
        await getAdminProducts(token);



      setProducts(data);



    }catch(error){


      console.log(
        "Product Fetch Error:",
        error
      );


    }finally{


      setLoading(false);


    }


  };






  useEffect(()=>{


    fetchProducts();


  },[]);







  const handleDelete = async(
    id:string
  )=>{


    const confirmDelete =
      confirm(
        "Are you sure you want to delete?"
      );



    if(!confirmDelete)
      return;




    const token =
      localStorage.getItem("token");



    if(!token)
      return;




    try{


      await removeProduct(
        id,
        token
      );



      fetchProducts();



    }catch(error){


      console.log(
        "Delete Error:",
        error
      );


    }


  };







  if(loading){


    return (

      <div className="p-8 text-gray-500">

        Loading products...

      </div>

    );


  }







  return (

    <div className="space-y-6">





      {/* HEADER */}


      <div className="
        flex
        justify-between
        items-center
      ">


        <div>


          <h1 className="
            text-3xl
            font-bold
          ">

            Products

          </h1>



          <p className="
            text-gray-500
            mt-1
          ">

            Manage your store products

          </p>


        </div>






        <Link

          href="/admin/products/add"

          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-gray-800
            transition
          "

        >

          + Add Product


        </Link>



      </div>








      {/* TABLE */}



      <div className="
        bg-white
        rounded-2xl
        shadow
        overflow-x-auto
      ">


        <table className="
          w-full
          min-w-[700px]
        ">



          <thead className="
            bg-gray-100
          ">


            <tr>


              <th className="
                p-4
                text-left
              ">

                Image

              </th>



              <th className="
                p-4
                text-left
              ">

                Name

              </th>




              <th className="
                p-4
                text-left
              ">

                Price

              </th>




              <th className="
                p-4
                text-left
              ">

                Stock

              </th>




              <th className="
                p-4
                text-left
              ">

                Action

              </th>



            </tr>


          </thead>







          <tbody>


          {
            products.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="
                    text-center
                    p-8
                    text-gray-500
                  "
                >

                  No products found

                </td>


              </tr>


            ) : (

            products.map((product)=>(


              <tr

                key={product._id}

                className="
                  border-t
                  hover:bg-gray-50
                "

              >





                {/* IMAGE */}


                <td className="p-4">


                  <div className="
                    flex
                    items-center
                    gap-3
                  ">


                    <img

                      src={
                        product.images?.[0]?.url ||
                        "/placeholder.png"
                      }


                      alt={product.name}


                      className="
                        w-14
                        h-14
                        rounded-lg
                        object-cover
                        border
                      "

                    />





                    {
                      product.images?.length > 1 && (

                        <span className="
                          text-xs
                          bg-gray-100
                          px-2
                          py-1
                          rounded-full
                        ">

                          +{product.images.length - 1}

                        </span>

                      )
                    }



                  </div>


                </td>







                {/* NAME */}


                <td className="
                  p-4
                  font-semibold
                ">

                  {product.name}


                </td>







                {/* PRICE */}


                <td className="p-4">

                  ${product.price}


                </td>








                {/* STOCK */}


                <td className="p-4">


                  <span
                    className={`
                      ${
                        product.stock <= 5
                        ? "text-red-600"
                        : "text-green-600"
                      }
                      font-semibold
                    `}
                  >

                    {product.stock}


                  </span>


                </td>









                {/* ACTION */}



                <td className="
                  p-4
                  space-x-4
                ">



                  <Link

                    href={
                      `/admin/products/edit/${product._id}`
                    }

                    className="
                      text-blue-600
                      hover:underline
                    "

                  >

                    Edit


                  </Link>





                  <button

                    onClick={()=>
                      handleDelete(product._id)
                    }


                    className="
                      text-red-600
                      hover:underline
                    "

                  >

                    Delete


                  </button>



                </td>





              </tr>


            ))

            )
          }



          </tbody>




        </table>




      </div>





    </div>

  );

}