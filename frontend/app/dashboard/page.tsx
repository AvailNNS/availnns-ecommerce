"use client";


import {
  useEffect,
  useState,
} from "react";


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


const [data,setData] =
useState<any>(null);


const [loading,setLoading] =
useState(true);





useEffect(()=>{

loadDashboard();

},[]);





const loadDashboard = async()=>{


try{


const result =
await getUserDashboard();


setData(result);



}catch(error:any){


console.log(
"Dashboard Error:",
error?.response?.data || error.message
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
space-y-6
">


<DashboardHeader

user={data.user}

/>





<DashboardStats

stats={data.stats}

/>





<RecentOrders

orders={data.orders || []}

/>



</div>

);


}