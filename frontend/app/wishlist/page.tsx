"use client";

import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingCart,
  Eye,
} from "lucide-react";

import { useWishlist } from "@/context/WishlistContext";
import useCart from "@/hooks/useCart";



export default function WishlistPage(){


const {
  wishlist,
  removeFromWishlist,
}=useWishlist();



const {
  addItem,
}=useCart();





return (

<div className="
min-h-screen
bg-gray-50
px-5
py-10
">


<div className="
mx-auto
max-w-7xl
">





{/* Header */}

<div className="
mb-8
flex
items-center
justify-between
">


<h1 className="
flex
items-center
gap-3
text-3xl
font-bold
">

<Heart

size={32}

className="
fill-red-500
text-red-500
"

/>

Wishlist

</h1>



<span className="
rounded-full
bg-white
px-4
py-2
text-sm
shadow
">

{wishlist.length} Items

</span>



</div>









{
wishlist.length === 0 ?

(


<div className="
rounded-3xl
bg-white
p-12
text-center
shadow
">


<Heart

size={60}

className="
mx-auto
mb-5
text-gray-300
"

/>



<h2 className="
text-2xl
font-semibold
">

Your wishlist is empty

</h2>




<p className="
mt-2
text-gray-500
">

Save your favorite products here

</p>





<Link

href="/shop"

className="
mt-6
inline-block
rounded-full
bg-black
px-8
py-3
text-white
"

>

Start Shopping

</Link>



</div>


)

:

(


<div className="
grid
grid-cols-1
gap-6
sm:grid-cols-2
lg:grid-cols-4
">


{

wishlist.map((item)=>(


<div

key={item._id}

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
"

>




{/* Image */}

<div className="
relative
h-64
overflow-hidden
bg-gray-100
">


<img

src={
item.image || "/placeholder.png"
}

alt={
item.name || "product"
}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-110
"

/>





<button

onClick={()=>removeFromWishlist(item._id)}

className="
absolute
right-4
top-4
rounded-full
bg-white
p-3
shadow
hover:text-red-500
"

>

<Trash2 size={18}/>

</button>



</div>









{/* Content */}

<div className="
p-5
">


<h3 className="
truncate
text-lg
font-semibold
">

{item.name}

</h3>





<p className="
mt-2
text-2xl
font-bold
">

${item.price}

</p>








<div className="
mt-5
flex
gap-3
">





{/* View */}

<Link

href={`/products/${item._id}`}

className="
flex
flex-1
items-center
justify-center
gap-2
rounded-full
border
py-2
text-sm
hover:bg-gray-100
"

>

<Eye size={16}/>

View

</Link>








{/* Cart */}

<button

onClick={()=>addItem(item._id,1)}

className="
flex
flex-1
items-center
justify-center
gap-2
rounded-full
bg-black
py-2
text-sm
text-white
hover:bg-gray-800
"

>

<ShoppingCart size={16}/>

Cart

</button>




</div>






</div>




</div>


))

}



</div>


)


}




</div>


</div>


);


}