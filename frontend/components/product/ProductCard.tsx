"use client";

import {
  useState
} from "react";

import Image from "next/image";
import Link from "next/link";


import {
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Star,
  Eye,
} from "lucide-react";


import {
  Product
} from "@/types/product";


import useCart from "@/hooks/useCart";


import {
  useWishlist
} from "@/context/WishlistContext";


import {
  useCurrency
} from "@/context/CurrencyContext";





export default function ProductCard({
 product,
}:{
 product:Product;
}){



const {
 cart,
 addItem,
 updateItem,
}=useCart();





const {
 addToWishlist,
 removeFromWishlist,
 isInWishlist,
}=useWishlist();





const {
 formatPrice
}=useCurrency();






const [hoverImage,setHoverImage]=
useState(false);





const wish =
isInWishlist(product._id);






const firstImage =
product.images?.[0]?.url ||
"/placeholder.png";



const secondImage =
product.images?.[1]?.url ||
firstImage;








const cartItem =
cart?.items?.find(
(item:any)=>

item.product?._id === product._id ||

item.product === product._id

);



const quantity =
cartItem?.quantity || 0;








const discount =
product.discountPrice &&
product.discountPrice < product.price

?

Math.round(

(
(product.price-product.discountPrice)
/product.price

)*100

)

:

0;







const increaseCart = async(e: React.MouseEvent)=>{

e.preventDefault();
e.stopPropagation();

if(quantity >= product.stock)
return;

// পুরো product অবজেক্ট পাস করা হলো যাতে গেস্ট ইউজারের ক্ষেত্রেও ছবি ও স্টক ঠিক থাকে
await addItem(
product,
1
);


};







const decreaseCart = async(e: React.MouseEvent)=>{

e.preventDefault();
e.stopPropagation();

if(quantity<=1){

await updateItem(
product._id,
0
);

return;

}


await updateItem(
product._id,
quantity-1
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
pointer-events-none
"

>

-{discount}%

</span>

}







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
pointer-events-none
"

>

Best Seller

</span>

}





<button

type="button"
onClick={(e)=>{

e.preventDefault();
e.stopPropagation();

if(wish){

removeFromWishlist(
product._id
);


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
hover:scale-110
z-20
cursor-pointer
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

{/* Quick View */}

<button

type="button"
onClick={(e)=>{
e.preventDefault();
e.stopPropagation();
}}

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
shadow
opacity-0
transition
group-hover:opacity-100
z-20
cursor-pointer
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
z-20
"

>


{

quantity===0 ?


<button

type="button"
disabled={
product.stock===0
}

onClick={increaseCart}


className={`
flex
h-12
w-12
items-center
justify-center
rounded-full
shadow-xl
transition
hover:scale-110
cursor-pointer

${
product.stock===0

?

"bg-gray-400 cursor-not-allowed"

:

"bg-black text-white"

}

`}

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
"

>


<button

type="button"
onClick={decreaseCart}
className="cursor-pointer"
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

type="button"
disabled={
quantity>=product.stock
}

onClick={increaseCart}
className="cursor-pointer"
>

<Plus size={16}/>

</button>



</div>


}


</div>



</div>








{/* Product Info */}


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
hover:text-blue-600
"

>

{product.name}

</h3>


</Link>






<p

className="
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








{/* Currency Updated Price */}


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


{

formatPrice(

product.discountPrice &&
product.discountPrice > 0

?

product.discountPrice

:

product.price

)

}


</p>








{

product.discountPrice &&
product.discountPrice > 0 &&



<p

className="
text-sm
text-gray-400
line-through
"

>


{

formatPrice(
product.price
)

}


</p>


}



</div>







{

product.stock > 0


?


<p

className="
mt-2
text-sm
font-medium
text-green-600
"

>

✓ {product.stock} items available

</p>



:


<p

className="
mt-2
text-sm
font-medium
text-red-500
"

>

Out of Stock

</p>



}



</div>




</div>


);

}
