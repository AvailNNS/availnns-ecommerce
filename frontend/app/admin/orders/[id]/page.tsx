"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  CheckCircle,
  Loader2,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  getOrderById,
  updateOrderStatus,
} from "@/services/order.service";



const statusSteps = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];



export default function OrderDetailsPage(){


const params = useParams();

const id = params.id as string;



const [order,setOrder] =
useState<any>(null);


const [loading,setLoading] =
useState(true);


const [updating,setUpdating] =
useState(false);


const [status,setStatus] =
useState("pending");





// LOAD ORDER

useEffect(()=>{


const loadOrder = async()=>{


try{


const token =
localStorage.getItem("token");


if(!token) return;



const res =
await getOrderById(
id,
token
);


// important fix

const data =
res.order || res;



setOrder(data);


setStatus(
data.orderStatus || "pending"
);



}catch(error){


console.log(error);


toast.error(
"Order loading failed"
);


}finally{


setLoading(false);


}


};



loadOrder();


},[id]);









// UPDATE STATUS

const handleStatusUpdate = async()=>{


try{


setUpdating(true);



const token =
localStorage.getItem("token");


if(!token) return;



const res =
await updateOrderStatus(

id,

status,

token

);



// update state

setOrder((prev:any)=>({

...prev,

orderStatus:status

}));


toast.success(
"Order status updated"
);



}catch(error:any){


console.log(error);


toast.error(
"Status update failed"
);



}finally{


setUpdating(false);


}


};










if(loading){


return (

<div className="
h-96
flex
items-center
justify-center
gap-3
">


<Loader2
className="animate-spin"
/>


Loading order...


</div>

);


}






if(!order){


return (

<div className="
p-10
text-center
font-bold
">

Order not found

</div>

);


}





const currentIndex =
statusSteps.indexOf(
order.orderStatus
);





return (

<div className="
max-w-7xl
space-y-8
">



<div>


<Link

href="/admin/orders"

className="
flex
items-center
gap-2
mb-5
text-gray-500
"

>

<ArrowLeft size={18}/>

Back Orders

</Link>



<h1 className="
text-4xl
font-black
">

Order #{order._id.slice(-8)}

</h1>


<p className="
text-gray-500
">

Admin order management

</p>


</div>







{/* STATUS */}

<div className="
rounded-3xl
border
bg-white
p-6
flex
flex-col
gap-5
md:flex-row
md:justify-between
md:items-center
">


<div>

<h2 className="
text-xl
font-bold
">

Order Status

</h2>


<p className="
text-gray-500
">

Update delivery progress

</p>

</div>





<div className="
flex
gap-3
">


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


<option value="pending">
Pending
</option>


<option value="processing">
Processing
</option>


<option value="shipped">
Shipped
</option>


<option value="delivered">
Delivered
</option>


<option value="cancelled">
Cancelled
</option>


</select>




<button

onClick={handleStatusUpdate}

disabled={updating}

className="
rounded-xl
bg-black
px-6
py-3
text-white
font-bold
"

>

{

updating
?
"Updating..."
:
"Save"

}

</button>



</div>


</div>








{/* INFO */}


<div className="
grid
gap-6
lg:grid-cols-3
">



<div className="
rounded-3xl
border
bg-white
p-6
">


<div className="
flex
gap-3
mb-5
items-center
">

<User/>

<h2 className="
font-bold
text-xl
">

Customer

</h2>

</div>



<p>
{order.user?.name || "Guest"}
</p>


<p className="
text-gray-500
">

{order.user?.email}

</p>


</div>







<div className="
rounded-3xl
border
bg-white
p-6
">


<div className="
flex
gap-3
mb-5
items-center
">

<MapPin/>

<h2 className="
font-bold
text-xl
">

Shipping

</h2>

</div>


<p>
{order.shippingAddress?.address}
</p>

<p>
{order.shippingAddress?.city}
</p>

<p>
{order.shippingAddress?.country}
</p>


</div>







<div className="
rounded-3xl
border
bg-white
p-6
">


<div className="
flex
gap-3
mb-5
items-center
">

<CreditCard/>

<h2 className="
font-bold
text-xl
">

Payment

</h2>


</div>


<p>
{order.paymentMethod}
</p>


<p>
{order.paymentStatus}
</p>


</div>



</div>








{/* PRODUCTS */}


<div className="
rounded-3xl
border
bg-white
p-6
">


<div className="
flex
gap-3
mb-6
items-center
">

<Package/>

<h2 className="
text-xl
font-bold
">

Products

</h2>


</div>



<div className="
space-y-4
">


{

order.items?.map(
(item:any)=>(


<div

key={item._id}

className="
flex
justify-between
rounded-2xl
bg-gray-50
p-4
"


>


<div>

<h3 className="
font-bold
">

{item.name}

</h3>


<p className="
text-gray-500
">

Qty: {item.quantity}

</p>


</div>



<p className="
font-bold
">

${item.price}

</p>



</div>


)

)


}



</div>





<div className="
mt-6
border-t
pt-5
flex
justify-between
font-black
text-xl
">

<span>
Total
</span>


<span>
${order.totalPrice}
</span>


</div>



</div>








{/* TIMELINE */}

<div className="
rounded-3xl
border
bg-white
p-6
">


<h2 className="
text-xl
font-bold
mb-6
">

Order Timeline

</h2>



<div className="
space-y-5
">


{

statusSteps.map(
(step,index)=>(


<div

key={step}

className="
flex
items-center
gap-4
"

>


<div

className={`
rounded-full
p-2
text-white

${
index<=currentIndex
?
"bg-black"
:
"bg-gray-300"
}

`}

>


<CheckCircle size={16}/>


</div>


<p className="
font-semibold
capitalize
">

{step}

</p>


</div>


)

)


}



</div>


</div>





</div>

);


}