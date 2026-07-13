"use client";


import {
useEffect,
useState
} from "react";


import {
Eye
} from "lucide-react";


import Link from "next/link";


import {
getAdminOrders
} from "@/services/order.service";





export default function AdminOrdersPage(){


const [orders,setOrders]=
useState<any[]>([]);


const [loading,setLoading]=
useState(true);





useEffect(()=>{


const loadOrders=async()=>{


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







if(loading){


return(

<div className="
p-10
text-center
">

Loading orders...

</div>

)

}







return(


<div className="space-y-8">


<div>

<h1 className="
text-3xl
font-bold
">

Orders

</h1>


<p className="
text-gray-500
">

Manage customer orders

</p>

</div>









<div className="
rounded-3xl
bg-white
shadow
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-gray-100
">


<tr>


<th className="p-4 text-left">
Order ID
</th>


<th className="p-4">
Customer
</th>


<th className="p-4">
Amount
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>








<tbody>


{

orders.map(order=>(


<tr

key={order._id}

className="
border-t
"

>


<td className="
p-4
font-medium
">

#{order._id.slice(-8)}

</td>





<td className="
p-4
">

{
order.user?.name ||
"Guest"
}

</td>





<td className="
p-4
font-bold
">

${order.totalPrice}

</td>





<td className="p-4">


<span

className={`
rounded-full
px-3
py-1
text-xs
font-semibold

${
order.status==="Delivered"

?

"bg-green-100 text-green-700"

:

order.status==="Cancelled"

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{order.status}

</span>


</td>







<td className="p-4">


<Link

href={`/admin/orders/${order._id}`}

className="
flex
items-center
gap-2
text-blue-600
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


</div>






</div>


);


}