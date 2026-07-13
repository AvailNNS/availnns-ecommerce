"use client";


import Link from "next/link";

import {
X,
ShoppingBag
} from "lucide-react";


import useCart from "@/hooks/useCart";

import CartItem from "./CartItem";



type Props = {

open:boolean;

onClose:()=>void;

};



export default function CartDrawer({
open,
onClose
}:Props){



const {
cart,
loading
}=useCart();



const items = cart?.items ?? [];



const subtotal = items.reduce(
(total:number,item:any)=>{

const price =
item?.product?.discountPrice ||
item?.product?.price ||
item?.price ||
0;


return total + price * (item.quantity || 1);

},
0
);



return (

<>


<div

onClick={onClose}

className={`
fixed
inset-0
z-40
bg-black/40
transition
${open 
? "visible opacity-100"
:"invisible opacity-0"
}
`}

/>



<aside

className={`
fixed
right-0
top-0
z-50
flex
h-screen
w-full
max-w-md
flex-col
bg-white
shadow-2xl
transition-transform
duration-300

${open
?"translate-x-0"
:"translate-x-full"
}

`}

>


<div className="
flex
items-center
justify-between
border-b
px-6
py-5
">


<h2 className="
text-xl
font-bold
">

Shopping Cart

</h2>



<button

onClick={onClose}

className="
rounded-full
p-2
hover:bg-gray-100
"

>

<X size={22}/>

</button>


</div>





<div className="
flex-1
overflow-y-auto
px-6
">


{
loading ?

<div className="
py-10
text-center
">

Loading...

</div>


:

items.length===0 ?


<div className="
flex
h-full
flex-col
items-center
justify-center
text-center
">


<ShoppingBag
size={60}
className="text-gray-300"
/>


<h3 className="
mt-4
text-lg
font-semibold
">

Your cart is empty

</h3>



<p className="
mt-2
text-sm
text-gray-500
">

Add some products to start shopping.

</p>


</div>


:


<div className="
space-y-3
py-4
">


{
items.map((item:any)=>(

<CartItem

key={
item?._id ||
item?.product?._id
}

item={item}

/>

))

}


</div>


}


</div>





{
items.length>0 &&

<div className="
border-t
p-6
">


<div className="
mb-5
flex
justify-between
">

<span className="
text-gray-500
">

Subtotal

</span>


<span className="
text-2xl
font-bold
">

${subtotal.toFixed(2)}

</span>


</div>




<Link

href="/checkout"

onClick={onClose}

className="
flex
w-full
justify-center
rounded-xl
bg-black
py-3
font-semibold
text-white
hover:bg-zinc-800
"

>

Checkout

</Link>


</div>

}


</aside>


</>

);

}