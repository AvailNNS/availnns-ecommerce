"use client";


import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Minus,
  Plus,
  Trash2
} from "lucide-react";


import useCart from "@/hooks/useCart";





export default function CartPage(){


const {

cart,

loading,

updateItem,

removeItem

}=useCart();






if(loading){

return (

<div className="p-10">

Loading cart...

</div>

);

}







if(!cart || cart.items.length===0){

return (

<div className="
min-h-screen
flex
items-center
justify-center
text-xl
">

Your cart is empty

</div>

);

}








return (

<main className="
bg-gray-50
min-h-screen
py-10
">


<div className="
max-w-6xl
mx-auto
px-6
">



<h1 className="
text-3xl
font-bold
mb-8
">

Shopping Cart

</h1>






<div className="
grid
lg:grid-cols-3
gap-8
">






{/* ITEMS */}

<div className="
lg:col-span-2
space-y-5
">



{
cart.items.map((item:any)=>(


<div

key={item.product._id}

className="
bg-white
rounded-xl
p-5
flex
gap-5
items-center
"


>



<Image

src={item.product.images[0].url}

alt={item.product.name}

width={120}

height={120}

className="
rounded-lg
object-cover
h-28
w-28
"

/>







<div className="flex-1">


<h2 className="
font-semibold
text-lg
">

{item.product.name}

</h2>



<p className="
text-gray-500
">

${item.price}

</p>




<div className="
flex
items-center
gap-3
mt-3
">



<button

onClick={()=>


updateItem(

item.product._id,

Math.max(
1,
item.quantity-1
)

)

}

className="
border
p-2
rounded
"

>

<Minus size={16}/>

</button>





<span>

{item.quantity}

</span>





<button

onClick={()=>


updateItem(

item.product._id,

item.quantity+1

)

}

className="
border
p-2
rounded
"

>

<Plus size={16}/>

</button>




</div>



</div>







<button

onClick={()=>


removeItem(

item.product._id

)

}

className="
text-red-500
"

>

<Trash2/>

</button>




</div>


))

}



</div>









{/* SUMMARY */}

<div className="
bg-white
rounded-xl
p-6
h-fit
">


<h2 className="
text-xl
font-bold
mb-5
">

Order Summary

</h2>




<div className="
flex
justify-between
mb-3
">


<span>

Subtotal

</span>


<span>

${cart.total}

</span>


</div>





<div className="
border-t
pt-4
flex
justify-between
font-bold
text-lg
">


<span>

Total

</span>


<span>

${cart.total}

</span>


</div>






<button

className="
mt-6
w-full
bg-black
text-white
py-3
rounded-xl
"

>

Checkout

</button>



</div>







</div>



</div>


</main>

);


}