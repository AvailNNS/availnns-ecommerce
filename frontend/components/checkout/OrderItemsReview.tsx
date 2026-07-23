"use client";


import Image from "next/image";



interface OrderItemsReviewProps {

items:any[];

}



export default function OrderItemsReview({

items,

}:OrderItemsReviewProps){



return (

<div

className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"

>


<h2

className="
mb-6
text-xl
font-black
"

>

Your Items

</h2>







<div

className="
space-y-4
"

>





{

items.map(

(item:any)=>(


<div

key={item._id}

className="
flex
items-center
gap-4
rounded-2xl
border
p-4
"

>







{/* IMAGE */}

<div

className="
relative
h-20
w-20
overflow-hidden
rounded-xl
bg-zinc-100
"

>


<Image


src={

item.product?.images?.[0]

||

item.product?.image

||

"/placeholder.png"

}


alt={

item.product?.name ||

"product"

}


fill


className="
object-cover
"


/>


</div>









{/* DETAILS */}

<div

className="
flex-1
"

>


<h3

className="
font-bold
"

>

{

item.product?.name ||

item.name

}


</h3>






<div

className="
mt-1
text-sm
text-zinc-500
"

>

Qty:

{" "}

{item.quantity}


</div>







</div>









{/* PRICE */}

<div

className="
text-right
"

>


<p

className="
font-bold
"

>

৳

{

Number(

item.product?.discountPrice ||

item.product?.price ||

item.price ||

0

)

*

Number(

item.quantity || 0

)

}


</p>






<p

className="
text-xs
text-zinc-500
"

>

@

৳

{

item.product?.discountPrice ||

item.product?.price ||

item.price ||

0

}


</p>




</div>







</div>



)


)


}



</div>






</div>


);


}