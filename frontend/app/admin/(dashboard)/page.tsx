"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboard.service";
import useAdminAuth from "@/hooks/useAdminAuth";


type DashboardStats = {
  totalProducts: number;
  totalUsers: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
  featuredProducts: number;
  bestSellerProducts: number;
  lowStockProducts: number;
};



export default function AdminDashboardPage() {


  const { loading: authLoading } = useAdminAuth();


  const [stats, setStats] =
    useState<DashboardStats | null>(null);


  const [error, setError] =
    useState("");




  useEffect(() => {


    const fetchDashboard = async () => {


      try {


        const token =
          localStorage.getItem("token");



        if (!token) {

          setError("No authentication token found");

          return;

        }




        const data =
          await getDashboardStats(token);



        console.log(
          "Dashboard Response:",
          data
        );



        setStats(data);



      } catch (err:any) {


        console.error(
          "Dashboard Error:",
          err
        );


        setError(
          err.message ||
          "Failed to load dashboard data"
        );


      }


    };



    if (!authLoading) {

      fetchDashboard();

    }



  }, [authLoading]);







  // Checking Admin

  if (authLoading) {


    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <div className="
            h-10
            w-10
            mx-auto
            rounded-full
            border-4
            border-gray-300
            border-t-black
            animate-spin
          " />


          <p className="mt-4 text-gray-500">
            Checking admin access...
          </p>


        </div>


      </div>

    );

  }






  // Error

  if (error) {


    return (

      <div className="p-6">


        <div className="
          bg-red-100
          text-red-600
          p-4
          rounded-lg
        ">

          {error}


        </div>


      </div>

    );

  }







  // Loading Data

  if (!stats) {


    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">


        <p className="text-gray-500">
          Loading dashboard...
        </p>


      </div>

    );

  }








  return (


    <div className="space-y-8">



      <div>


        <h1 className="
          text-4xl
          font-bold
        ">

          Admin Dashboard

        </h1>



        <p className="
          text-gray-500
          mt-2
        ">

          Manage your store, products and customers

        </p>


      </div>






      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">




        <StatsCard
          title="Products"
          icon="📦"
          value={stats.totalProducts}
        />



        <StatsCard
          title="Users"
          icon="👥"
          value={stats.totalUsers}
        />



        <StatsCard
          title="Categories"
          icon="📂"
          value={stats.totalCategories}
        />



        <StatsCard
          title="Orders"
          icon="🛒"
          value={stats.totalOrders}
        />



        <StatsCard
          title="Revenue"
          icon="💰"
          value={`$${stats.totalRevenue}`}
        />



        <StatsCard
          title="Featured Products"
          icon="⭐"
          value={stats.featuredProducts}
        />



        <StatsCard
          title="Best Sellers"
          icon="🔥"
          value={stats.bestSellerProducts}
        />



        <StatsCard
          title="Low Stock"
          icon="⚠️"
          value={stats.lowStockProducts}
        />



      </div>



    </div>

  );

}







function StatsCard({

  title,

  icon,

  value,

}:{

  title:string;

  icon:string;

  value:number | string;

}) {



  return (


    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      p-6
      hover:shadow-lg
      transition
    ">


      <div className="
        flex
        items-center
        justify-between
      ">


        <div>


          <p className="
            text-gray-500
            text-sm
          ">

            {title}

          </p>



          <h2 className="
            text-3xl
            font-bold
            mt-3
          ">

            {value}

          </h2>


        </div>




        <div className="text-4xl">

          {icon}

        </div>



      </div>



    </div>


  );

}