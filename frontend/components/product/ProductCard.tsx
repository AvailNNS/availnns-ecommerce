"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Product } from "@/types/product";

import useCart from "@/hooks/useCart";



export default function ProductCard({
  product,
}:{
  product:Product;
}){


const {
  addItem,
  updateItem,
} = useCart();



const [quantity,setQuantity] = useState(0);

const [wish,setWish] = useState(false);






const increaseCart = async()=>{


const newQty = quantity + 1;


setQuantity(newQty);



await addItem(
product._id,
1
);


};








const decreaseCart = async()=>{


if(quantity <= 1){


setQuantity(0);


return;


}



const newQty = quantity - 1;


setQuantity(newQty);



await updateItem(
product._id,
newQty
);



};









return (

<div

className="
group
relative
bg-white
rounded-3xl
overflow-hidden
border
shadow-sm
hover:shadow-2xl
transition-all
duration-300
"

>





{/* IMAGE */}

<Link
href={`/products/${product._id}`}
>


<div

className="
relative
h-64
overflow-hidden
bg-gray-100
"

>


<img

src={
product.images?.[0]?.url
}

alt={
product.name
}

className="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-500
"

/>





{/* Wishlist */}

<button

onClick={()=>setWish(!wish)}

className="
absolute
top-4
right-4
bg-white
rounded-full
p-3
shadow-md
hover:scale-110
transition
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






{
product.isBestSeller &&

<span

className="
absolute
left-4
top-4
bg-black
text-white
text-xs
px-4
py-2
rounded-full
"

>

Best Seller

</span>

}




</div>


</Link>









{/* CONTENT */}


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
text-yellow-500
text-sm
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






<h3

className="
mt-2
font-semibold
text-lg
truncate
"

>

{product.name}

</h3>






<p

className="
text-gray-500
text-sm
mt-1
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
flex
justify-between
items-center
mt-5
"

>


<div>


<p

className="
font-bold
text-2xl
"

>

${product.price}

</p>


</div>







{/* CART CONTROL */}



{

quantity === 0 ?


<button

onClick={increaseCart}

className="
bg-black
text-white
rounded-full
w-12
h-12
flex
items-center
justify-center
hover:scale-110
transition
shadow-lg
"

>

<Plus size={24}/>

</button>



:



<div

className="
flex
items-center
gap-3
bg-black
text-white
rounded-full
px-4
py-2
shadow-lg
"

>


<button

onClick={decreaseCart}

>

<Minus size={18}/>

</button>




<span

className="
font-bold
min-w-5
text-center
"

>

{quantity}

</span>




<button

onClick={increaseCart}

>

<Plus size={18}/>

</button>



</div>


}





</div>



</div>



</div>


);


}