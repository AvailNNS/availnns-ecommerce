"use client";


import {
  useEffect,
  useState,
} from "react";


import Link from "next/link";


import {
  Eye,
  Search,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";


import {
  getAdminOrders,
} from "@/services/order.service";







const statusOptions=[

{
label:"All",
value:"all"
},

{
label:"Pending",
value:"pending"
},

{
label:"Processing",
value:"processing"
},

{
label:"Shipped",
value:"shipped"
},

{
label:"Delivered",
value:"delivered"
},

{
label:"Cancelled",
value:"cancelled"
}

];









export default function AdminOrdersPage(){



const [orders,setOrders] =
useState<any[]>([]);



const [loading,setLoading] =
useState(true);



const [search,setSearch] =
useState("");



const [status,setStatus] =
useState("all");









// =========================
// LOAD ORDERS
// =========================


useEffect(()=>{


const loadOrders = async()=>{


try{


const token =
localStorage.getItem("token");


if(!token)
return;



const data =
await getAdminOrders(token);



setOrders(data);



}catch(error){


console.log(error);



}finally{


setLoading(false);


}



};


loadOrders();


},[]);










// =========================
// FILTER
// =========================


const filteredOrders =

orders.filter(order=>{


const keyword =
search.toLowerCase();




const matchSearch =

order._id
.toLowerCase()
.includes(keyword)

||

order.user?.name
?.toLowerCase()
.includes(keyword);





const matchStatus =

status==="all"

?

true

:

order.orderStatus===status;





return (

matchSearch &&

matchStatus

);



});











// =========================
// STATS
// =========================


const stats=[


{
title:"Total Orders",
value:orders.length,
icon:ShoppingCart
},


{
title:"Pending",
value:

orders.filter(

o=>

o.orderStatus==="pending"

).length,

icon:Clock
},


{
title:"Delivered",
value:

orders.filter(

o=>

o.orderStatus==="delivered"

).length,

icon:CheckCircle
},


{
title:"Cancelled",
value:

orders.filter(

o=>

o.orderStatus==="cancelled"

).length,

icon:XCircle
}


];









if(loading){


return(

<div className="
h-96
flex
items-center
justify-center
gap-3
">


<Loader2
className="
animate-spin
"
/>


Loading orders...


</div>


);


}








return (

<div className="
space-y-8
">





{/* HEADER */}


<div>


<h1 className="
text-4xl
font-black
">

Orders

</h1>


<p className="
text-gray-500
">

Manage customer orders and delivery

</p>


</div>









{/* STATS */}


<div className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
">


{

stats.map(item=>(


<div

key={item.title}

className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"


>


<div className="
flex
items-center
justify-between
">


<div>

<p className="
text-sm
text-gray-500
">

{item.title}

</p>


<h2 className="
mt-2
text-3xl
font-black
">

{item.value}

</h2>


</div>




<div className="
rounded-2xl
bg-black
p-3
text-white
">


<item.icon size={22}/>


</div>



</div>



</div>


))


}


</div>









{/* SEARCH FILTER */}


<div className="
flex
flex-col
gap-4
md:flex-row
">



<div className="
relative
flex-1
">


<Search

size={20}

className="
absolute
left-3
top-3.5
text-gray-400
"

/>



<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="
Search order or customer...
"

className="
w-full
rounded-xl
border
py-3
pl-10
pr-4
outline-none
"


/>


</div>






<select

value={status}

onChange={
e=>setStatus(e.target.value)
}

className="
rounded-xl
border
px-4
py-3
"

>


{

statusOptions.map(item=>(


<option

key={item.value}

value={item.value}

>

{item.label}

</option>


))


}


</select>



</div>

{/* ORDERS TABLE */}


<div className="
overflow-hidden
rounded-3xl
border
bg-white
shadow-sm
">





<table className="
hidden
w-full
md:table
">


<thead className="
bg-zinc-100
">


<tr>


<th className="
p-5
text-left
">

Order

</th>


<th>
Customer
</th>


<th>
Amount
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>







<tbody>


{

filteredOrders.map(order=>(


<tr

key={order._id}

className="
border-t
hover:bg-gray-50
transition
"

>



<td className="
p-5
font-bold
">

#{order._id.slice(-8)}

</td>








<td>


<div>


<p className="
font-semibold
">

{
order.user?.name ||

"Guest"

}

</p>



<p className="
text-xs
text-gray-500
">

{
order.user?.email ||

""

}

</p>



</div>


</td>









<td className="
font-black
">

${order.totalPrice}

</td>










<td>


<span

className={`
rounded-full
px-3
py-1
text-xs
font-bold

${
order.orderStatus==="delivered"

?

"bg-green-100 text-green-700"

:

order.orderStatus==="cancelled"

?

"bg-red-100 text-red-700"

:

order.orderStatus==="processing"

?

"bg-blue-100 text-blue-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{
order.orderStatus
}

</span>


</td>









<td>


<Link

href={`/admin/orders/${order._id}`}

className="
flex
items-center
gap-2
font-semibold
text-blue-600
hover:underline
"

>


<Eye size={18}/>

View


</Link>


</td>





</tr>


))


}




</tbody>




</table>









{/* MOBILE VIEW */}



<div className="
space-y-4
p-4
md:hidden
">


{

filteredOrders.map(order=>(


<div

key={order._id}

className="
rounded-2xl
border
p-5
space-y-3
"

>


<div className="
flex
justify-between
items-center
">


<h3 className="
font-black
">

#{order._id.slice(-8)}

</h3>



<span

className={`
rounded-full
px-3
py-1
text-xs
font-bold

${
order.orderStatus==="delivered"

?

"bg-green-100 text-green-700"

:

order.orderStatus==="cancelled"

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>


{order.orderStatus}


</span>



</div>









<p className="
font-semibold
">

{
order.user?.name ||

"Guest"

}

</p>




<p className="
text-gray-500
text-sm
">

{
order.user?.email

}

</p>








<div className="
flex
justify-between
font-black
">


<span>

Amount

</span>



<span>

${order.totalPrice}

</span>


</div>









<Link

href={`/admin/orders/${order._id}`}

className="
mt-3
flex
items-center
justify-center
gap-2
rounded-xl
bg-black
py-3
text-white
font-bold
"

>


<Eye size={16}/>


View Order


</Link>



</div>


))


}



</div>







</div>









{

filteredOrders.length===0 &&

<div className="
rounded-3xl
border
bg-white
p-10
text-center
font-bold
text-gray-500
">


No orders found


</div>

}



</div>


);


}