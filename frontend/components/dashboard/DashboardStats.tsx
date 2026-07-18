"use client";


import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Wallet,
} from "lucide-react";



export default function DashboardStats({
  orders
}:{
  orders:any[];
}){


const totalOrders = orders.length;


const pendingOrders =
orders.filter(
(order)=>
order.orderStatus==="pending"
).length;



const deliveredOrders =
orders.filter(
(order)=>
order.orderStatus==="delivered"
).length;



const totalSpent =
orders.reduce(
(sum,order)=>
sum + (order.totalPrice || 0),
0
);





const stats = [

{
title:"Total Orders",
value:totalOrders,
icon:<ShoppingBag size={25}/>
},


{
title:"Pending Orders",
value:pendingOrders,
icon:<Clock size={25}/>
},


{
title:"Delivered",
value:deliveredOrders,
icon:<CheckCircle size={25}/>
},


{
title:"Total Spent",
value:`৳ ${totalSpent.toFixed(2)}`,
icon:<Wallet size={25}/>
},


];





return (

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
mb-6
">


{
stats.map((stat)=>(

<div
key={stat.title}
className="
bg-white
rounded-xl
shadow-sm
p-6
flex
items-center
justify-between
hover:shadow-md
transition
"
>


<div>


<p className="
text-gray-500
text-sm
">

{stat.title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{stat.value}

</h2>


</div>



<div className="
w-12
h-12
rounded-xl
bg-black
text-white
flex
items-center
justify-center
">

{stat.icon}

</div>



</div>


))
}



</div>

);

}