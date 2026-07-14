"use client";

import {
  ShoppingBag,
  Loader2,
  ShieldCheck,
} from "lucide-react";


interface Props {

  items:any[];

  subtotal:number;

  shipping:number;

  tax:number;

  discount:number;

  total:number;

  loading:boolean;

}



export default function OrderSummary({

  items,

  subtotal,

  shipping,

  tax,

  discount,

  total,

  loading,

}:Props){



return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
sticky
top-5
">


<h2 className="
mb-6
flex
items-center
gap-2
text-xl
font-bold
">

<ShoppingBag size={24}/>

Order Summary

</h2>






<div className="
space-y-5
max-h-[420px]
overflow-y-auto
">


{
items.map((item:any)=>(


<div

key={item._id}

className="
flex
gap-4
border-b
pb-4
"


>


<div className="
h-16
w-16
overflow-hidden
rounded-xl
bg-zinc-100
">


{
item.product?.images?.[0]?.url &&

<img

src={
item.product.images[0].url
}

alt={
item.product.name
}

className="
h-full
w-full
object-cover
"

/>

}


</div>





<div className="
flex-1
">


<h3 className="
text-sm
font-semibold
line-clamp-2
">

{item.product?.name}

</h3>


<p className="
mt-1
text-sm
text-zinc-500
">

Qty: {item.quantity}

</p>



</div>





<div className="
font-semibold
">

${(
item.price *
item.quantity
).toFixed(2)}

</div>



</div>


))

}


</div>








<div className="
my-6
border-t
pt-5
space-y-3
">


<div className="
flex
justify-between
text-sm
">

<span className="text-zinc-500">
Subtotal
</span>

<span>
${subtotal.toFixed(2)}
</span>

</div>





<div className="
flex
justify-between
text-sm
">


<span className="text-zinc-500">
Shipping
</span>


<span>
${shipping.toFixed(2)}
</span>


</div>






<div className="
flex
justify-between
text-sm
">


<span className="text-zinc-500">
Tax
</span>


<span>
${tax.toFixed(2)}
</span>


</div>







{
discount > 0 &&

<div className="
flex
justify-between
text-sm
text-green-600
">


<span>
Discount
</span>


<span>
-${discount.toFixed(2)}
</span>


</div>

}





<div className="
mt-4
flex
justify-between
border-t
pt-4
text-xl
font-bold
">


<span>
Total
</span>


<span>
${total.toFixed(2)}
</span>


</div>



</div>







<div className="
mb-5
flex
items-center
gap-2
rounded-xl
bg-green-50
p-4
text-sm
text-green-700
">


<ShieldCheck size={18}/>

Secure & Protected Checkout

</div>








<button

disabled={loading}

className="
w-full
rounded-2xl
bg-black
py-4
font-bold
text-white
transition
hover:bg-zinc-800
disabled:opacity-50
"

>


{
loading

?

<div className="
flex
items-center
justify-center
gap-2
">

<Loader2
className="animate-spin"
/>

Processing...

</div>


:

"Place Order"

}



</button>






</div>


);


}