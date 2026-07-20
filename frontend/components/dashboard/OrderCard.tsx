"use client";


import Link from "next/link";

import {
Eye,
Package
} from "lucide-react";



export default function OrderCard({

order

}:{

order:any;

}){


return (

<div

className="
bg-white
rounded-2xl
border
p-6
shadow-sm
hover:shadow-md
transition
"

>


<div className="
flex
items-center
justify-between
mb-5
">


<div className="
flex
items-center
gap-3
">


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

<Package size={22}/>

</div>



<div>

<h3 className="
font-bold
">

Order #{order._id.slice(-8)}

</h3>


<p className="
text-sm
text-gray-500
">

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</p>


</div>


</div>





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

{order.orderStatus}

</span>



</div>






<div className="
border-t
pt-4
flex
justify-between
items-center
">


<div>


<p className="
text-sm
text-gray-500
">

Total Amount

</p>


<p className="
text-xl
font-bold
">

৳ {order.totalPrice}

</p>


</div>





<Link

href={`/dashboard/orders/${order._id}`}

className="
flex
items-center
gap-2
bg-black
text-white
px-4
py-2
rounded-xl
text-sm
"

>

<Eye size={16}/>

View

</Link>



</div>



</div>

);


}