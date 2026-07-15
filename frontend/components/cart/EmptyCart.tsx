"use client";


import Link from "next/link";

import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";



export default function EmptyCart(){


return (

<div

className="
min-h-[70vh]
flex
flex-col
items-center
justify-center
text-center
px-6
"

>


<div

className="
h-32
w-32
rounded-full
bg-gray-100
flex
items-center
justify-center
"

>

<ShoppingBag

size={55}

className="
text-gray-400
"

/>

</div>





<h1

className="
mt-6
text-3xl
font-bold
"

>

Your cart is empty

</h1>





<p

className="
mt-3
text-gray-500
max-w-md
"

>

You haven't added anything yet.
Explore our products and find something you love.

</p>







<Link

href="/shop"

className="
mt-7
flex
items-center
gap-2
bg-black
text-white
px-8
py-3
rounded-xl
font-semibold
hover:bg-zinc-800
"

>

Start Shopping

<ArrowRight size={18}/>

</Link>






</div>


);


}