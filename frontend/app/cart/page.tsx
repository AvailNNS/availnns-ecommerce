"use client";


import Link from "next/link";

import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Tag,
  Sparkles,
} from "lucide-react";


import useCart from "@/hooks/useCart";

import CartItem from "@/components/cart/CartItem";




export default function CartPage(){


const {
  cart,
  loading,
  totalItems,
}=useCart();





// =======================
// LOADING
// =======================

if(loading){

return (

<main
className="
min-h-screen
flex
items-center
justify-center
bg-gray-50
"
>

<div
className="
animate-pulse
text-gray-500
"
>
Loading your cart...
</div>


</main>

);


}






// =======================
// EMPTY CART
// =======================

if(
!cart ||
!cart.items ||
cart.items.length===0
){


return (

<main
className="
min-h-[80vh]
flex
items-center
justify-center
bg-gray-50
px-6
"
>


<div
className="
text-center
max-w-md
"
>


<div
className="
mx-auto
flex
h-32
w-32
items-center
justify-center
rounded-full
bg-white
shadow
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
mt-8
text-3xl
font-black
"
>

Your cart is empty

</h1>





<p
className="
mt-3
text-gray-500
"
>

Discover amazing products and add
them to your cart.

</p>





<Link
href="/shop"
className="
inline-flex
items-center
gap-2
mt-8
rounded-xl
bg-black
px-8
py-4
text-white
font-semibold
hover:bg-zinc-800
transition
"
>

Start Shopping

<ArrowRight size={18}/>

</Link>



</div>


</main>


);


}






// =======================
// PRICE
// =======================


const subtotal =
Number(cart.total || 0);



const shipping =
subtotal >=100
?
0
:
10;



const tax =
subtotal * 0.05;



const total =
subtotal + shipping + tax;



const progress =
Math.min(
(subtotal/100)*100,
100
);



return (

<main
className="
min-h-screen
bg-gray-50
py-10
"
>


<div
className="
mx-auto
max-w-7xl
px-4
sm:px-6
lg:px-8
"
>


{/* HEADER */}


<div
className="
mb-10
"
>


<h1
className="
text-4xl
font-black
tracking-tight
"
>

Shopping Cart

</h1>



<p
className="
mt-2
text-gray-500
"
>

{totalItems} products in your cart

</p>


</div>

{/* MAIN GRID */}

<div
className="
grid
gap-8
lg:grid-cols-3
"
>



{/* ==========================
    CART PRODUCTS
========================== */}


<section
className="
space-y-5
lg:col-span-2
"
>


<div
className="
rounded-2xl
bg-white
border
p-5
shadow-sm
"
>


<div
className="
flex
items-center
justify-between
mb-5
"
>


<h2
className="
text-xl
font-bold
"
>

Your Products

</h2>



<span
className="
rounded-full
bg-gray-100
px-4
py-1
text-sm
font-medium
"
>

{totalItems} Items

</span>


</div>





<div
className="
space-y-4
"
>


{
cart.items.map(
(item:any)=>(


<CartItem

key={
item.product._id
}

item={item}

/>


)

)

}



</div>



</div>






{/* BENEFITS */}


<div
className="
grid
gap-4
sm:grid-cols-3
"
>



<div
className="
rounded-2xl
border
bg-white
p-5
"
>

<Truck
size={24}
/>


<h3
className="
mt-3
font-bold
"
>

Fast Delivery

</h3>


<p
className="
text-sm
text-gray-500
mt-1
"
>

2-5 business days

</p>


</div>






<div
className="
rounded-2xl
border
bg-white
p-5
"
>

<ShieldCheck
size={24}
/>


<h3
className="
mt-3
font-bold
"
>

Secure Payment

</h3>


<p
className="
text-sm
text-gray-500
mt-1
"
>

100% secure checkout

</p>


</div>








<div
className="
rounded-2xl
border
bg-white
p-5
"
>

<Sparkles
size={24}
/>


<h3
className="
mt-3
font-bold
"
>

Premium Quality

</h3>


<p
className="
text-sm
text-gray-500
mt-1
"
>

Verified products

</p>


</div>




</div>



</section>

{/* ==========================
    ORDER SUMMARY
========================== */}


<aside
className="
h-fit
lg:sticky
lg:top-24
"
>


<div
className="
rounded-2xl
border
bg-white
p-6
shadow-sm
"
>



<h2
className="
text-xl
font-black
mb-6
"
>

Order Summary

</h2>






{/* FREE SHIPPING */}


<div
className="
rounded-xl
bg-gray-50
p-4
mb-6
"
>


<div
className="
flex
justify-between
text-sm
font-medium
"
>

<span>

Free Shipping

</span>


<span>

${subtotal.toFixed(2)}/100

</span>


</div>





<div
className="
mt-3
h-2
rounded-full
bg-gray-200
overflow-hidden
"
>


<div

className="
h-full
bg-black
transition-all
"

style={{

width:`${progress}%`

}}


/>


</div>





{

subtotal < 100 ?

<p
className="
mt-2
text-xs
text-gray-500
"
>

Add ${(100-subtotal).toFixed(2)}
more to unlock free shipping

</p>


:

<p
className="
mt-2
text-xs
font-semibold
text-green-600
"
>

🎉 Free shipping unlocked

</p>


}



</div>








{/* COUPON */}


<div
className="
mb-6
"
>


<label
className="
flex
items-center
gap-2
text-sm
font-semibold
mb-2
"
>

<Tag size={16}/>

Coupon Code

</label>




<div
className="
flex
gap-2
"
>


<input

placeholder="
Enter coupon
"

className="
flex-1
rounded-xl
border
px-4
py-3
outline-none
focus:ring-2
focus:ring-black/10
"

/>



<button

className="
rounded-xl
bg-black
px-5
text-white
font-semibold
hover:bg-zinc-800
"
>

Apply

</button>


</div>



</div>










{/* PRICE DETAILS */}



<div
className="
space-y-4
text-sm
"
>


<div
className="
flex
justify-between
"
>

<span>
Subtotal
</span>


<span
className="
font-semibold
"
>

${subtotal.toFixed(2)}

</span>


</div>





<div
className="
flex
justify-between
"
>

<span>
Shipping
</span>


<span
className="
font-semibold
"
>

{
shipping===0
?
"FREE"
:
`$${shipping}`
}


</span>


</div>






<div
className="
flex
justify-between
"
>

<span>
Tax (5%)
</span>


<span
className="
font-semibold
"
>

${tax.toFixed(2)}

</span>


</div>




</div>







{/* TOTAL */}


<div
className="
mt-6
border-t
pt-5
flex
justify-between
items-center
"
>


<span
className="
text-lg
font-bold
"
>

Total

</span>



<span
className="
text-3xl
font-black
"
>

${total.toFixed(2)}

</span>



</div>







{/* CHECKOUT */}



<Link

href="/checkout"

className="
mt-7
flex
items-center
justify-center
gap-2
rounded-xl
bg-black
py-4
text-white
font-bold
hover:bg-zinc-800
transition
"
>

Proceed To Checkout

<ArrowRight size={18}/>

</Link>








<Link

href="/shop"

className="
mt-3
flex
items-center
justify-center
rounded-xl
border
py-3
font-medium
hover:bg-gray-50
"
>

Continue Shopping

</Link>







<div
className="
mt-5
flex
justify-center
items-center
gap-2
text-sm
text-gray-500
"
>

<ShieldCheck size={16}/>

Secure SSL Checkout

</div>





</div>


</aside>



</div>


</div>


</main>

);


}