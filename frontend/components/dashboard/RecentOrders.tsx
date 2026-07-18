"use client";


import Link from "next/link";

import {
  Eye,
} from "lucide-react";



export default function RecentOrders({
  orders
}:{
  orders:any[];
}){


const recentOrders =
orders.slice(0,5);



return (

<div className="
bg-white
rounded-xl
shadow-sm
p-6
">


<div className="
flex
items-center
justify-between
mb-5
">


<h2 className="
text-xl
font-bold
">

Recent Orders

</h2>


<Link
href="/orders"
className="
text-sm
font-medium
hover:underline
"
>

View All

</Link>


</div>





{
recentOrders.length===0 ?


(

<div className="
text-center
py-10
text-gray-500
">

No orders found

</div>

)


:

(

<div className="
overflow-x-auto
">


<table className="
w-full
text-left
">


<thead>

<tr className="
border-b
text-gray-500
text-sm
">


<th className="
py-3
">
Order ID
</th>


<th>
Date
</th>


<th>
Status
</th>


<th>
Amount
</th>


<th>
Action
</th>


</tr>


</thead>





<tbody>


{
recentOrders.map((order)=>(


<tr
key={order._id}
className="
border-b
hover:bg-gray-50
transition
"
>


<td className="
py-4
font-medium
">

#
{order._id.slice(-8)}

</td>



<td>

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</td>





<td>


<span
className={`
px-3
py-1
rounded-full
text-xs
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

`}
>

{
order.orderStatus
}

</span>


</td>





<td className="
font-semibold
">

৳ {order.totalPrice}


</td>




<td>


<Link
href={`/orders/${order._id}`}
className="
inline-flex
items-center
gap-2
px-3
py-2
rounded-lg
bg-black
text-white
text-sm
hover:opacity-80
"
>


<Eye size={16}/>


View


</Link>


</td>




</tr>


))
}


</tbody>


</table>


</div>

)

}



</div>

);

}