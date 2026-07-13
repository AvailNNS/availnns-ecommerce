"use client";

import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Product } from "@/types/product";

import useCart from "@/hooks/useCart";



export default function ProductInfo({
  product,
}:{
  product:Product;
}){


const router = useRouter();


const [quantity,setQuantity] =
useState(1);


const [adding,setAdding] =
useState(false);



const {
 addItem
}=useCart();






const discountPercentage =

product.discountPrice &&
product.discountPrice < product.price

?

Math.round(

(
(product.price - product.discountPrice)
/
product.price

)*100

)

:

0;








const handleAddToCart = async()=>{


try{


setAdding(true);



await addItem(

product._id,

quantity

);



router.push("/cart");



}catch(error){


console.log(
"Cart error",
error
);


}finally{


setAdding(false);


}


};









return (

<div className="space-y-6">





{
product.isBestSeller &&


<span
className="
inline-flex
items-center
gap-2
rounded-full
bg-black
px-4
py-2
text-sm
font-semibold
text-white
"
>

<BadgeCheck size={16}/>

Best Seller

</span>


}








<h1
className="
mt-3
text-4xl
font-bold
leading-tight
"
>

{product.name}

</h1>









<div
className="
flex
items-center
gap-3
"
>


<div
className="
flex
text-yellow-500
"
>


{

[1,2,3,4,5].map(i=>(

<Star

key={i}

size={18}

fill="currentColor"

/>

))

}


</div>



<span className="text-gray-500">

{product.rating || 5}

({product.numReviews || 0} Reviews)

</span>


</div>









{/* PRICE */}


<div
className="
flex
items-center
gap-4
mt-6
"
>



<h2
className="
text-4xl
font-bold
"
>


$

{

product.discountPrice &&
product.discountPrice > 0

?

product.discountPrice

:

product.price

}


</h2>








{

product.discountPrice &&
product.discountPrice > 0 &&


<>


<span
className="
text-xl
text-gray-400
line-through
"
>

$
{product.price}

</span>




<span
className="
rounded-full
bg-red-100
px-3
py-1
text-sm
font-semibold
text-red-600
"
>

-{discountPercentage}%

</span>


</>


}




</div>









{/* DESCRIPTION */}



<div
className="
rounded-2xl
bg-white
p-6
shadow-sm
"
>


<h3
className="
mb-3
text-xl
font-bold
"
>

Description

</h3>



<p
className="
leading-8
text-gray-600
whitespace-pre-line
"
>

{product.description}

</p>


</div>









{/* PRODUCT INFO */}



<div
className="
grid
grid-cols-2
gap-4
"
>


<div
className="
rounded-xl
bg-white
p-4
"
>


<p className="text-sm text-gray-500">
Stock
</p>


<p className="font-bold">
{product.stock}
</p>


</div>






<div
className="
rounded-xl
bg-white
p-4
"
>


<p className="text-sm text-gray-500">
Category
</p>


<p className="font-bold">

{

typeof product.category==="object"

?

product.category.name

:

""

}

</p>


</div>



</div>









{/* QUANTITY */}


<div
className="
flex
items-center
gap-5
"
>



<button

disabled={quantity<=1}

onClick={()=>


setQuantity(
prev=>Math.max(
1,
prev-1
)
)

}

className="
rounded-xl
border
p-3
disabled:opacity-40
"
>

<Minus size={18}/>

</button>






<span
className="
text-xl
font-bold
"
>

{quantity}

</span>






<button

disabled={
quantity>=product.stock
}

onClick={()=>


setQuantity(
prev=>prev+1
)

}

className="
rounded-xl
border
p-3
disabled:opacity-40
"
>

<Plus size={18}/>

</button>



</div>









{/* ACTION */}



<div
className="
flex
gap-4
"
>



<button

disabled={
adding ||
product.stock===0
}

onClick={handleAddToCart}

className="
flex-1
rounded-xl
bg-black
py-4
font-semibold
text-white
transition
hover:opacity-90
disabled:opacity-50
"

>


<ShoppingCart
className="inline mr-2"
size={20}
/>



{

product.stock===0

?

"Out of Stock"

:

adding

?

"Adding..."

:

"Add To Cart"

}


</button>







<button

onClick={()=>router.push("/checkout")}

className="
flex-1
rounded-xl
border
border-black
py-4
font-semibold
transition
hover:bg-black
hover:text-white
"

>

Buy Now

</button>



</div>









{/* FEATURES */}



<div
className="
space-y-4
rounded-2xl
bg-white
p-6
"
>


<div
className="
flex
items-center
gap-3
"
>

<Truck/>

Fast Delivery

</div>




<div
className="
flex
items-center
gap-3
"
>

<ShieldCheck/>

Secure Payment

</div>



</div>







</div>

);


}