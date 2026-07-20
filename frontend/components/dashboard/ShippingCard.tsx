"use client";


import {
MapPin
} from "lucide-react";



export default function ShippingCard({

address

}:{
address:any;
}){


return (

<div className="
bg-white
rounded-2xl
p-6
shadow-sm
">


<div className="
flex
items-center
gap-3
mb-4
">

<MapPin/>

<h2 className="
text-xl
font-bold
">

Shipping Address

</h2>


</div>





<div className="
space-y-1
text-gray-600
">


<p>
{address?.name}
</p>


<p>
{address?.phone}
</p>


<p>
{address?.address}
</p>


<p>
{address?.city}
</p>


</div>


</div>

);

}