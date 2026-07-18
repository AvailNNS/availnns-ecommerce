"use client";


import {
  useEffect,
  useState,
} from "react";


import DashboardSidebar
from "@/components/dashboard/DashboardSidebar";


import DashboardHeader
from "@/components/dashboard/DashboardHeader";


import DashboardStats
from "@/components/dashboard/DashboardStats";


import RecentOrders
from "@/components/dashboard/RecentOrders";


import {
  getUserDashboard
} from "@/services/user.service";



export default function DashboardPage(){


const [data,setData] = useState<any>(null);

const [loading,setLoading] = useState(true);




useEffect(()=>{


loadDashboard();


},[]);





const loadDashboard = async()=>{

try{


const result = await getUserDashboard();


setData(result);



}catch(error:any){


console.log(
"Dashboard Error:",
error
);



}finally{


setLoading(false);


}


};





if(loading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
text-gray-500
">

Loading dashboard...


</div>

);


}





if(!data){


return (

<div className="
min-h-screen
flex
items-center
justify-center
text-red-500
">

Failed to load dashboard


</div>

);


}







return (

<div className="
flex
min-h-screen
bg-gray-50
">


{/* Sidebar */}

<DashboardSidebar/>





{/* Content */}

<main className="
flex-1
p-4
md:p-8
">



<DashboardHeader

user={data.user}

/>





<DashboardStats

orders={data.orders || []}

/>





<RecentOrders

orders={data.orders || []}

/>



</main>



</div>

);

}