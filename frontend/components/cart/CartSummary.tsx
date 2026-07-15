"use client";


import Link from "next/link";


import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
} from "lucide-react";



type Props={

cart:any;

totalItems:number;

};





export default function CartSummary({

cart,

totalItems

}:Props){





const subtotal =
Number(cart?.total || 0);





const freeShippingLimit = 100;





const shipping =

subtotal >= freeShippingLimit

?

0

:

10;





const discount = 0;




const tax =
Number(
((subtotal-discount)*0.05)
.toFixed(2)
);





const total =

subtotal +

shipping +

tax -

discount;





const progress =

Math.min(

(subtotal/freeShippingLimit)*100,

100

);







return (

<aside

className="
rounded-2xl
border
bg-white
p-6
shadow-sm
sticky
top-24
"

>



<h2

className="
text-xl
font-bold
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

${subtotal.toFixed(2)}
/100

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

subtotal < 100

?

<p

className="
mt-2
text-xs
text-gray-500
"

>

Add ${(100-subtotal).toFixed(2)}
more for free shipping

</p>


:

<p

className="
mt-2
text-xs
font-medium
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
border
rounded-xl
px-4
py-3
outline-none
"

 />



<button

className="
rounded-xl
border
px-5
font-medium
hover:bg-gray-50
"

>

Apply

</button>



</div>


</div>









{/* PRICE */}


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

Items ({totalItems})

</span>


<span>

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

Discount

</span>


<span className="
text-green-600
"

>

-$
{discount.toFixed(2)}

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



<span>

{

shipping===0

?

"Free"

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

Tax

</span>



<span>

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
text-2xl
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
mt-6
flex
items-center
justify-center
gap-2
rounded-xl
bg-black
py-4
font-bold
text-white
transition
hover:bg-zinc-800
"

>


Proceed Checkout


<ArrowRight size={18}/>


</Link>









<div

className="
mt-5
space-y-2
text-sm
text-gray-500
"

>



<div

className="
flex
items-center
gap-2
justify-center
"

>


<Truck size={16}/>


2-5 Business Days Delivery


</div>





<div

className="
flex
items-center
gap-2
justify-center
"

>


<ShieldCheck size={16}/>


Secure SSL Checkout


</div>




</div>





</aside>


);


}