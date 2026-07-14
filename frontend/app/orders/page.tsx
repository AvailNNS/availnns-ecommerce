"use client";


import {
  useEffect,
  useState,
} from "react";


import Link from "next/link";


import {
  getMyOrders,
} from "@/services/order.service";


import {
  Loader2,
  Package,
} from "lucide-react";





export default function OrdersPage(){


const [orders,setOrders]
=
useState<any[]>([]);



const [loading,setLoading]
=
useState(true);



const [error,setError]
=
useState("");






useEffect(()=>{


const fetchOrders = async()=>{


try{


setLoading(true);


const data =
await getMyOrders();



setOrders(data);



}

catch(err:any){


setError(
"Failed to load orders"
);


}

finally{


setLoading(false);


}


};



fetchOrders();


},[]);







if(loading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
">


<Loader2
className="
animate-spin
"
size={35}
/>


</div>

);


}







return (

<main className="
min-h-screen
bg-zinc-50
py-10
">


<div className="
max-w-6xl
mx-auto
px-5
">


<h1 className="
text-4xl
font-bold
mb-8
">

My Orders

</h1>

{
error &&

<div className="
mb-6
rounded-xl
bg-red-50
p-4
text-red-600
">

{error}

</div>

}








{
orders.length===0 ?


<div className="
rounded-3xl
bg-white
border
p-10
text-center
shadow-sm
">


<div className="
mx-auto
mb-5
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-zinc-100
">


<Package size={40}/>


</div>



<h2 className="
text-2xl
font-bold
">

No Orders Yet

</h2>



<p className="
mt-3
text-zinc-500
">

You haven't placed any orders yet.

</p>




<Link

href="/shop"

className="
mt-6
inline-flex
rounded-xl
bg-black
px-6
py-3
font-semibold
text-white
"

>

Start Shopping

</Link>



</div>



:



<div className="
space-y-6
">


{
orders.map((order:any)=>(


<div

key={order._id}

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
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
">



<div>


<p className="
text-sm
text-zinc-500
">

Order ID

</p>



<h2 className="
font-bold
break-all
">

#{order._id}

</h2>


</div>






<div className="
flex
items-center
gap-3
">


<span className={`

rounded-full

px-4

py-2

text-sm

font-semibold


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

`}>

{order.orderStatus}

</span>



</div>




</div>

<div className="
mt-6
space-y-4
">


{
order.items
?.slice(0,3)
.map((item:any)=>(


<div

key={item._id}

className="
flex
items-center
gap-4
rounded-xl
bg-zinc-50
p-4
"

>


<div className="
h-16
w-16
overflow-hidden
rounded-xl
bg-white
">


{
item.image &&

<img

src={item.image}

alt={item.name}

className="
h-full
w-full
object-cover
"

/>

}


</div>





<div className="
flex-1
">


<h3 className="
font-semibold
line-clamp-1
">

{item.name}

</h3>


<p className="
text-sm
text-zinc-500
">

Qty: {item.quantity}

</p>



</div>





<div className="
font-bold
">

${(
item.price *
item.quantity
).toFixed(2)}

</div>



</div>


))


}



</div>








<div className="
mt-6
flex
flex-col
gap-4
border-t
pt-5
md:flex-row
md:items-center
md:justify-between
">



<div>


<p className="
text-sm
text-zinc-500
">

Order Date

</p>


<p className="
font-semibold
">

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</p>


</div>







<div>


<p className="
text-sm
text-zinc-500
">

Total Amount

</p>


<p className="
text-xl
font-bold
">

${order.totalPrice.toFixed(2)}

</p>


</div>







<Link

href={`/orders/${order._id}`}

className="
rounded-xl
bg-black
px-6
py-3
text-center
font-semibold
text-white
hover:bg-zinc-800
transition
"

>

View Details

</Link>




</div>





</div>


))


}



</div>


}



</div>


</main>


);


}