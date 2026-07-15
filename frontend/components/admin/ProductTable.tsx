"use client";


import Image from "next/image";
import Link from "next/link";

import {
Edit,
Trash2,
Star,
Flame
} from "lucide-react";



type Props={

products:any[];

onDelete:(id:string)=>void;

};




export default function ProductTable({
products,
onDelete
}:Props){



return (

<div
className="
overflow-hidden
rounded-3xl
border
bg-white
shadow-sm
"
>


<div
className="
overflow-x-auto
"
>


<table
className="
w-full
text-sm
"
>


<thead
className="
bg-zinc-50
"
>

<tr>

<th className="p-5 text-left">
Product
</th>


<th>
Category
</th>


<th>
Price
</th>


<th>
Stock
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>

</thead>





<tbody>


{
products.map(product=>(


<tr

key={product._id}

className="
border-t
hover:bg-zinc-50
transition
"

>


<td className="
p-5
">


<div
className="
flex
items-center
gap-4
"
>


<div
className="
relative
h-14
w-14
overflow-hidden
rounded-xl
bg-gray-100
"
>

<Image

src={
product.images?.[0]?.url ||
"/placeholder.png"
}

alt={product.name}

fill

className="
object-cover
"

/>


</div>





<div>

<p
className="
font-semibold
"
>

{product.name}

</p>


<p
className="
text-xs
text-gray-500
"
>

SKU:
{product.sku || "N/A"}

</p>


</div>



</div>


</td>








<td>

{
typeof product.category==="object"

?
product.category.name

:

"N/A"

}

</td>









<td
className="
font-bold
"
>


$

{
product.discountPrice ||
product.price
}


</td>









<td>


<span

className={`
rounded-full
px-3
py-1
text-xs
font-semibold

${
product.stock>5

?

"bg-green-100 text-green-700"

:

product.stock>0

?

"bg-orange-100 text-orange-700"

:

"bg-red-100 text-red-700"

}

`}

>


{
product.stock>0

?

`${product.stock} left`

:

"Out"

}


</span>


</td>









<td>


<div
className="
flex
gap-2
"
>


{
product.isFeatured &&

<span
className="
flex
items-center
gap-1
rounded-full
bg-yellow-100
px-2
py-1
text-xs
"
>

<Star size={12}/>

Featured

</span>

}





{
product.isBestSeller &&

<span
className="
flex
items-center
gap-1
rounded-full
bg-red-100
px-2
py-1
text-xs
"
>

<Flame size={12}/>

Best

</span>

}



</div>


</td>









<td>


<div
className="
flex
gap-2
"
>


<Link

href={`/admin/products/edit/${product._id}`}

className="
rounded-xl
bg-black
p-2
text-white
"

>

<Edit size={16}/>

</Link>







<button

onClick={()=>onDelete(product._id)}

className="
rounded-xl
bg-red-500
p-2
text-white
"

>

<Trash2 size={16}/>

</button>



</div>


</td>





</tr>


))


}



</tbody>



</table>


</div>


</div>


);


}