"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getAdminCategories,
  removeCategory,
} from "@/services/category.service";

import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
} from "lucide-react";



export default function AdminCategoriesPage(){


  const [categories,setCategories] =
    useState<any[]>([]);


  const [loading,setLoading] =
    useState(true);



  const fetchCategories = async()=>{


    try{


      const token =
        localStorage.getItem("token");


      if(!token) return;



      const data =
        await getAdminCategories(token);

      setCategories(Array.isArray(data) ? data : []);

    } catch (error) {


      console.log(
        "Category Error:",
        error
      );


    }finally{


      setLoading(false);


    }


  };






  useEffect(()=>{

    fetchCategories();

  },[]);









  const handleDelete = async(
    id:string
  )=>{


    const confirmDelete =
      confirm(
        "Are you sure delete this category?"
      );


    if(!confirmDelete)
      return;



    try{


      const token =
        localStorage.getItem("token");



      if(!token)
        return;



      await removeCategory(
        id,
        token
      );



      fetchCategories();



    }catch(error){


      console.log(error);


    }


  };








  if(loading){

    return (

      <div className="
        p-8
        text-gray-500
      ">

        Loading categories...

      </div>

    );

  }







  return (

    <div className="space-y-8">



      {/* Header */}

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

            Categories

          </h1>


          <p className="
            text-gray-500
            mt-1
          ">

            Manage your product categories

          </p>


        </div>






        <Link

          href="/admin/categories/add"

          className="
            flex
            items-center
            gap-2
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-gray-800
          "

        >

          <Plus size={20}/>

          Add Category


        </Link>



      </div>









      {/* Table */}

      <div className="
        bg-white
        rounded-2xl
        shadow
        overflow-hidden
      ">


        <table className="
          w-full
        ">


          <thead className="
            bg-gray-100
          ">

            <tr>


              <th className="
                text-left
                p-5
              ">

                Category

              </th>



              <th className="
                text-left
                p-5
              ">

                Description

              </th>




              <th className="
                text-center
                p-5
              ">

                Actions

              </th>



            </tr>


          </thead>






          <tbody>


          {
            categories.length === 0 ? (


              <tr>

                <td
                  colSpan={3}
                  className="
                    text-center
                    p-8
                    text-gray-500
                  "
                >

                  No categories found


                </td>


              </tr>


            ) : (


            categories.map(
              (category)=>(
                

              <tr

                key={category._id}

                className="
                  border-t
                  hover:bg-gray-50
                "

              >


                <td className="
                  p-5
                  font-semibold
                ">


                  <div className="
                    flex
                    items-center
                    gap-3
                  ">


                    <FolderTree
                      size={20}
                    />


                    {category.name}


                  </div>


                </td>





                <td className="
                  p-5
                  text-gray-600
                ">


                  {
                    category.description ||
                    "No description"
                  }


                </td>







                <td className="
                  p-5
                ">


                  <div className="
                    flex
                    justify-center
                    gap-3
                  ">



                    <Link

                      href={`/admin/categories/edit/${category._id}`}

                      className="
                        p-2
                        rounded-lg
                        bg-blue-100
                        text-blue-600
                      "

                    >

                      <Edit size={18}/>


                    </Link>







                    <button

                      onClick={()=>
                        handleDelete(
                          category._id
                        )
                      }

                      className="
                        p-2
                        rounded-lg
                        bg-red-100
                        text-red-600
                      "

                    >

                      <Trash2 size={18}/>


                    </button>




                  </div>


                </td>




              </tr>


              )
            )

            )

          }


          </tbody>



        </table>



      </div>




    </div>

  );

}