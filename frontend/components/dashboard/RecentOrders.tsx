"use client";


import Link from "next/link";

import {
  Eye,
  Package,
  CreditCard,
} from "lucide-react";



export default function RecentOrders({

orders

}:{

orders:any[];

}){



const recentOrders =
orders.slice(0,5);





const statusStyle = (status:string)=>{


switch(status){


case "delivered":

return "bg-green-100 text-green-700";


case "cancelled":

return "bg-red-100 text-red-700";


case "shipped":

return "bg-blue-100 text-blue-700";


default:

return "bg-yellow-100 text-yellow-700";


}


};








return (


<div

className="
bg-white
rounded-3xl
shadow-sm
border
p-6
"

>



{/* Header */}

<div

className="
flex
items-center
justify-between
mb-6
"

>


<div>


<h2

className="
text-xl
font-bold
"

>

Recent Orders

</h2>


<p

className="
text-sm
text-gray-500
mt-1
"

>

Your latest purchases

</p>


</div>





<Link

href="/dashboard/orders"

className="
text-sm
font-semibold
hover:underline
"

>

View All

</Link>



</div>








{
recentOrders.length===0 ?



(

<div

className="
py-12
text-center
text-gray-500
"

>


<Package

size={40}

className="
mx-auto
mb-3
"

/>


<p>

No orders found

</p>


</div>


)

:



(


<div

className="
space-y-4
"

>


{
recentOrders.map((order)=>(


<div

key={order._id}

className="
border
rounded-2xl
p-5
hover:shadow-md
transition
"

>



<div

className="
flex
flex-col
md:flex-row
md:items-center
justify-between
gap-4
"

>





{/* Order Info */}

<div>


<p

className="
font-bold
"

>

Order #
{order._id.slice(-8)}

</p>



<p

className="
text-sm
text-gray-500
mt-1
"

>

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</p>


</div>









{/* Status */}


<div>


<span

className={`
px-4
py-2
rounded-full
text-xs
font-bold
capitalize
${statusStyle(order.orderStatus)}
`}

>

{
order.orderStatus
}

</span>


</div>









{/* Payment */}


<div

className="
flex
items-center
gap-2
text-sm
text-gray-600
"

>


<CreditCard size={16}/>


{
order.paymentStatus || "Pending"

}


</div>









{/* Amount */}


<div

className="
font-bold
text-lg
"

>

৳ {order.totalPrice?.toFixed(2)}

</div>









{/* Action */}


<Link


href={`/orders/${order._id}`}


className="
flex
items-center
justify-center
gap-2
bg-black
text-white
px-4
py-2
rounded-xl
text-sm
hover:opacity-80
"

>


<Eye size={16}/>


View


</Link>




</div>



</div>


))

}


</div>



)


}



</div>



);

}