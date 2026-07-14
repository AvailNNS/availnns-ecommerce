"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useSearchParams,
} from "next/navigation";


import Confetti from "react-confetti";


import {
  CheckCircle2,
  Package,
  ShoppingBag,
  Truck,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";



export default function SuccessPage(){


const searchParams = useSearchParams();


const orderId =
searchParams.get("order");



const [mounted,setMounted]
=
useState(false);



useEffect(()=>{

setMounted(true);

},[]);





return (

<main className="
min-h-screen
bg-gradient-to-b
from-green-50
via-white
to-zinc-100
flex
items-center
justify-center
px-4
py-12
">


{
mounted &&

<Confetti

numberOfPieces={250}

recycle={false}

/>

}





<div className="
w-full
max-w-2xl
rounded-3xl
bg-white
border
shadow-2xl
p-8
">





<div className="
flex
justify-center
">


<div className="
h-28
w-28
rounded-full
bg-green-100
flex
items-center
justify-center
animate-pulse
">


<CheckCircle2

size={72}

className="
text-green-600
"

/>


</div>


</div>







<h1 className="
mt-8
text-center
text-4xl
font-extrabold
text-zinc-900
">

Order Placed Successfully 🎉

</h1>





<p className="
mt-4
text-center
text-zinc-600
leading-7
">

Thank you for shopping with NOPTRIX.
Your order has been received and is now
being prepared for shipment.

</p>







<div className="
mt-8
rounded-3xl
border
bg-zinc-50
p-6
space-y-4
">



<div className="
flex
justify-between
">

<span className="text-zinc-500">
Order ID
</span>


<span className="
font-bold
break-all
">

#{orderId || "N/A"}

</span>


</div>





<div className="
flex
justify-between
">


<span className="text-zinc-500">
Status
</span>


<span className="
font-bold
text-green-600
">

Confirmed

</span>


</div>





<div className="
flex
justify-between
">


<span className="text-zinc-500">
Delivery
</span>


<span className="font-bold">

3-5 Business Days

</span>


</div>


</div>







<div className="
mt-6
rounded-3xl
border
border-green-200
bg-green-50
p-6
">


<div className="
flex
gap-4
items-center
">


<div className="
rounded-full
bg-white
p-3
">

<Truck className="text-green-600"/>

</div>



<div>

<h3 className="
font-bold
text-lg
">

Your order is being prepared

</h3>


<p className="
text-sm
text-zinc-600
mt-1
">

We are packing your items.

</p>


</div>


</div>


</div>







<div className="
mt-6
rounded-3xl
border
p-6
">


<div className="
flex
gap-3
items-center
mb-5
">

<Mail size={22}/>

<h3 className="font-bold text-lg">

What's Next?

</h3>

</div>





<div className="
space-y-4
">


<p>✅ Order confirmation completed</p>

<p>📦 Package preparation started</p>

<p>🚚 Tracking available after shipment</p>


</div>



</div>







<div className="
mt-6
rounded-3xl
bg-zinc-900
p-6
text-white
">


<div className="
flex
gap-4
">


<ShieldCheck/>


<div>


<h3 className="
font-bold
text-lg
">

Secure Checkout

</h3>


<p className="
text-sm
text-zinc-300
mt-2
">

Your order information is protected.

</p>


</div>


</div>


</div>







<div className="
mt-8
grid
gap-4
sm:grid-cols-3
">



<Link

href="/orders"

className="
flex
items-center
justify-center
gap-2
rounded-2xl
bg-black
py-4
text-white
font-semibold
"

>

<Package size={20}/>

My Orders

</Link>






<Link

href={`/orders/${orderId || ""}`}

className="
flex
items-center
justify-center
gap-2
rounded-2xl
border
py-4
font-semibold
"

>

<Truck size={20}/>

Track Order

</Link>






<Link

href="/shop"

className="
flex
items-center
justify-center
gap-2
rounded-2xl
border
py-4
font-semibold
"

>

<ShoppingBag size={20}/>

Shop More

</Link>



</div>







<div className="
mt-10
rounded-3xl
bg-zinc-950
p-6
text-white
">


<h3 className="
text-xl
font-bold
">

Thank you for choosing NOPTRIX ❤️

</h3>



<p className="
mt-3
text-sm
text-zinc-300
">

We appreciate your trust.
Our support team is always ready to help.

</p>




<Link

href="/contact"

className="
mt-5
inline-flex
items-center
gap-2
text-green-400
font-semibold
"

>

Contact Support

<ArrowRight size={18}/>

</Link>



</div>





</div>



</main>

);


}