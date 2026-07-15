"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


import {
  getAdminOrders,
} from "@/services/order.service";





const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444",
  "#3b82f6",
];





export default function OrderChart(){



const [data,setData] =
useState<any[]>([]);



const [loading,setLoading] =
useState(true);







useEffect(()=>{


const loadOrders = async()=>{


try{


const token =
localStorage.getItem("token");


if(!token)
return;



const orders =
await getAdminOrders(token);





const statusCount:any = {

Delivered:0,

Pending:0,

Cancelled:0,

Processing:0,

};





orders.forEach((order:any)=>{


if(statusCount[order.status] !== undefined){

statusCount[order.status]++;

}


});





const chartData = Object.keys(statusCount)

.map(status=>({


name:status,


value:statusCount[status]


}))


.filter(item=>item.value>0);






setData(chartData);




}catch(error){


console.log(
"Chart error",
error
);



}finally{


setLoading(false);


}


};




loadOrders();



},[]);









if(loading){


return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
h-96
flex
items-center
justify-center
">

Loading chart...


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
flex
items-center
justify-between
">


<div>

<h2 className="
text-xl
font-bold
">

Order Status

</h2>


<p className="
text-sm
text-gray-500
">

Live order overview

</p>


</div>


</div>








{

data.length===0 ?


<div className="
h-64
flex
items-center
justify-center
text-gray-500
">

No orders available

</div>



:


<div className="
h-72
">


<ResponsiveContainer

width="100%"

height="100%"

>


<PieChart>


<Pie

data={data}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius={100}

innerRadius={55}

paddingAngle={5}

label


>


{

data.map(
(item,index)=>(


<Cell

key={item.name}

fill={COLORS[index % COLORS.length]}

/>


)

)


}


</Pie>



<Tooltip/>


<Legend/>




</PieChart>


</ResponsiveContainer>


</div>



}





</div>


);


}