"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";


import {
  Category,
} from "@/types/category";



interface Props {

  category: Category;

}



export default function CategorySidebar({

category,

}: Props){



const pathname = usePathname();





return (

<aside

className="
rounded-2xl
border
border-zinc-200
bg-white
p-5
"

>


<h2

className="
mb-5
text-lg
font-bold
text-zinc-900
"

>

{category.name}

</h2>






<div

className="
space-y-2
"

>


{


category.children &&
category.children.length > 0 ? (



category.children.map((item)=>(


<Link

key={item._id}

href={`/category/${item.slug}`}

className={`

block
rounded-lg
px-3
py-2
text-sm
transition


${
pathname === `/category/${item.slug}`

?

"bg-black text-white"

:

"text-zinc-600 hover:bg-zinc-100 hover:text-black"

}

`}

>

{item.name}

</Link>


))



)

:

(


<p

className="
text-sm
text-zinc-400
"

>

No subcategories available.

</p>


)



}



</div>




</aside>


);


}