"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Star,
  Eye,
} from "lucide-react";

import { Product } from "@/types/product";

import useCart from "@/hooks/useCart";
import { useWishlist } from "@/context/WishlistContext";



export default function ProductCard({
  product,
}:{
  product:Product;
}){


const {
 addItem,
 updateItem,
}=useCart();



const [quantity,setQuantity]=useState(0);

const [hoverImage,setHoverImage]=useState(false);




const {
 addToWishlist,
 removeFromWishlist,
 isInWishlist,
}=useWishlist();



const wish =
isInWishlist(product._id);





const firstImage =
product.images?.[0]?.url ||
"/placeholder.png";


const secondImage =
product.images?.[1]?.url ||
firstImage;





const discount =
product.discountPrice
?
Math.round(
((product.price-product.discountPrice)
/product.price)*100
)
:
0;





const increaseCart = async()=>{

setQuantity(
prev=>prev+1
);

await addItem(
product._id,
1
);

};





const decreaseCart = async()=>{


if(quantity<=1){

setQuantity(0);

return;

}


const qty =
quantity-1;


setQuantity(qty);


await updateItem(
product._id,
qty
);


};





return (

<div

className="
group
overflow-hidden
rounded-3xl
border
bg-white
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:shadow-2xl
"

>





<div

className="
relative
h-72
overflow-hidden
bg-gray-100
"

onMouseEnter={()=>
setHoverImage(true)
}

onMouseLeave={()=>
setHoverImage(false)
}

>


<Link
href={`/products/${product._id}`}
>


<Image

src={
hoverImage
?
secondImage
:
firstImage
}

alt={product.name}

fill

sizes="
(max-width:768px) 100vw,
25vw
"

className="
object-cover
transition
duration-500
group-hover:scale-110
"

/>


</Link>





{
discount>0 &&

<span

className="
absolute
left-4
top-4
rounded-full
bg-red-500
px-3
py-1
text-xs
font-bold
text-white
"

>

-{discount}%

</span>

}





<button

onClick={()=>{

if(wish){

removeFromWishlist(
product._id
)

}else{

addToWishlist({

_id:product._id,

name:product.name,

price:
product.discountPrice ||
product.price,

image:firstImage

});

}

}}

className="
absolute
right-4
top-4
rounded-full
bg-white
p-3
shadow-lg
transition
hover:scale-110
"

>


<Heart

size={20}

className={

wish
?
"fill-red-500 text-red-500"
:
"text-gray-700"

}

/>


</button>

// Quick View Button

<button

className="
absolute
bottom-4
left-4
flex
items-center
gap-2
rounded-full
bg-white
px-4
py-2
text-sm
font-medium
shadow
opacity-0
transition
group-hover:opacity-100
"

>

<Eye size={16}/>

Quick View

</button>









{/* Cart Button */}

<div

className="
absolute
bottom-4
right-4
"

>


{

quantity===0 ?


<button

onClick={increaseCart}

className="
flex
h-12
w-12
items-center
justify-center
rounded-full
bg-black
text-white
shadow-xl
transition
hover:scale-110
"

>


<ShoppingCart size={22}/>


</button>



:


<div

className="
flex
items-center
gap-3
rounded-full
bg-black
px-4
py-2
text-white
shadow-xl
"

>


<button

onClick={decreaseCart}

>

<Minus size={16}/>

</button>



<span

className="
font-bold
"

>

{quantity}

</span>



<button

onClick={increaseCart}

>

<Plus size={16}/>

</button>



</div>


}


</div>









{

product.isBestSeller &&

<span

className="
absolute
bottom-4
left-4
rounded-full
bg-black
px-3
py-1
text-xs
text-white
"

>

Best Seller

</span>

}



</div>









{/* PRODUCT INFO */}


<div

className="
p-5
"

>





<div

className="
flex
items-center
gap-1
text-sm
text-yellow-500
"

>

<Star

size={15}

fill="currentColor"

/>


<span>

{product.rating || 5}

</span>


</div>








<Link

href={`/products/${product._id}`}

>

<h3

className="
mt-2
truncate
text-lg
font-semibold
transition
hover:text-blue-600
"

>

{product.name}

</h3>


</Link>







<p

className="
mt-1
text-sm
text-gray-500
"

>

{
typeof product.category==="object"
?
product.category.name
:
""
}

</p>



<div

className="
mt-4
flex
items-center
gap-3
"

>


<p

className="
text-2xl
font-bold
"

>

$

{
product.discountPrice ||
product.price
}

</p>




{

product.discountPrice &&

<p

className="
text-sm
text-gray-400
line-through
"

>

${product.price}

</p>

}



</div>





<p

className="
mt-2
text-sm
text-green-600
font-medium
"

>

✓ In Stock

</p>







</div>



</div>


);

}