"use client";


import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck
} from "lucide-react";


import { useState } from "react";

import { useRouter } from "next/navigation";


import { Product } from "@/types/product";


import useCart from "@/hooks/useCart";





export default function ProductInfo({

product

}:{

product:Product;

}){


const [quantity,setQuantity] =
useState(1);


const [adding,setAdding] =
useState(false);



const router = useRouter();


const {
  addItem
} = useCart();








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

"Add cart error:",

error

);


}finally{


setAdding(false);


}


};









return (

<div>


{
product.isBestSeller &&

<span className="
bg-black
text-white
px-4
py-2
rounded-full
text-sm
">

Best Seller

</span>

}







<h1 className="
text-4xl
font-bold
mt-5
">

{product.name}

</h1>







<div className="
flex
items-center
gap-2
mt-4
">


<div className="
flex
text-yellow-500
">


{
[1,2,3,4,5].map(

(i)=>(

<Star

key={i}

size={18}

fill="currentColor"

/>

)

)

}


</div>


<span className="text-gray-500">

({product.numReviews} Reviews)

</span>


</div>









<div className="
flex
gap-4
items-center
mt-6
">


<h2 className="
text-4xl
font-bold
">

${product.price}

</h2>





{
product.discountPrice > 0 &&

<span className="
text-gray-400
line-through
text-xl
">

${product.discountPrice}

</span>

}



</div>









<div className="
mt-8
bg-white
rounded-2xl
p-6
shadow-sm
">


<h3 className="
font-semibold
text-xl
mb-3
">

Description

</h3>


<p className="
text-gray-600
leading-8
whitespace-pre-line
">

{product.description}

</p>


</div>









<div className="
grid
grid-cols-2
gap-4
mt-6
">


<div className="
bg-white
p-4
rounded-xl
">


<p className="text-gray-500 text-sm">

Stock

</p>


<p className="font-semibold">

{product.stock}

</p>


</div>






<div className="
bg-white
p-4
rounded-xl
">


<p className="text-gray-500 text-sm">

Category

</p>


<p className="font-semibold">


{

typeof product.category === "object"

?

product.category.name

:

""

}


</p>


</div>



</div>









<div className="
flex
items-center
gap-4
mt-8
">





<button

onClick={()=>


setQuantity(

Math.max(

1,

quantity-1

)

)

}

className="
border
rounded-lg
p-3
"

>

<Minus size={18}/>

</button>







<span className="
text-xl
font-semibold
">

{quantity}

</span>







<button

onClick={()=>


setQuantity(

quantity+1

)

}

className="
border
rounded-lg
p-3
"

>

<Plus size={18}/>

</button>



</div>









<div className="
flex
gap-4
mt-8
">





<button


onClick={handleAddToCart}


disabled={adding}


className="
flex-1
bg-black
text-white
py-4
rounded-xl
flex
items-center
justify-center
gap-2
font-semibold
disabled:opacity-50
"

>


<ShoppingCart size={20}/>



{

adding

?

"Adding..."

:

"Add To Cart"

}



</button>








<button

className="
flex-1
border
border-black
rounded-xl
font-semibold
hover:bg-black
hover:text-white
"

>

Buy Now

</button>



</div>









<div className="
mt-8
space-y-4
">



<div className="
flex
gap-3
items-center
">

<Truck/>

Fast Delivery

</div>






<div className="
flex
gap-3
items-center
">

<ShieldCheck/>

Secure Payment

</div>




</div>





</div>

);


}