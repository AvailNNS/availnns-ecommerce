"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


import {
  getMonthlySales,
} from "@/services/dashboard.service";





export default function SalesChart(){



const [data,setData] =
useState<any[]>([]);



const [loading,setLoading] =
useState(true);








useEffect(()=>{


const loadSales = async()=>{


try{


const token =
localStorage.getItem("token");



if(!token)
return;



const sales =
await getMonthlySales(token);






const months = [

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"

];






const chartData =
sales.map((item:any)=>({


month:

months[
item._id.month - 1
],


sales:

item.revenue



}));







setData(chartData);





}catch(error){


console.log(
"Sales chart error",
error
);



}finally{


setLoading(false);


}


};




loadSales();



},[]);










if(loading){


return (

<div className="
rounded-3xl
border
bg-white
p-6
h-96
flex
items-center
justify-center
">

Loading revenue chart...

</div>

);


}










return (

<div

className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"

>


<div className="
mb-6
">


<h2 className="
text-xl
font-bold
">

Revenue Analytics

</h2>


<p className="
text-sm
text-gray-500
">

Monthly sales performance

</p>


</div>








<div className="
h-72
">


{

data.length===0 ?


<div className="
h-full
flex
items-center
justify-center
text-gray-500
">

No sales data

</div>



:


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={data}

>


<CartesianGrid

strokeDasharray="3 3"

/>



<XAxis

dataKey="month"

/>



<YAxis/>



<Tooltip/>



<Line

type="monotone"

dataKey="sales"

stroke="#000"

strokeWidth={3}

dot={{r:5}}

/>



</LineChart>


</ResponsiveContainer>


}



</div>




</div>


);


}