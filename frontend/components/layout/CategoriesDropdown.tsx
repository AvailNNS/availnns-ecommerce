"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  ChevronDown,
} from "lucide-react";



const categories = [

{
name:"Electronics",
slug:"electronics",

sub:[
"Mobile",
"Laptop",
"Camera",
"Accessories"
]

},


{
name:"Fashion",
slug:"fashion",

sub:[
"Men",
"Women",
"Shoes",
"Watches"
]

},


{
name:"Home & Living",
slug:"home-living",

sub:[
"Furniture",
"Kitchen",
"Decoration"
]

},


{
name:"Beauty",
slug:"beauty",

sub:[
"Skin Care",
"Hair Care",
"Perfume"
]

},


];







export default function CategoriesDropdown(){


const [open,setOpen]=useState(false);



return (

<div

className="
relative
"

onMouseEnter={()=>setOpen(true)}

onMouseLeave={()=>setOpen(false)}

>





<button

className="
flex
items-center
gap-2
text-sm
font-semibold
text-gray-600
hover:text-black
transition
"

>

Categories

<ChevronDown

size={16}

className={`
transition

${open?"rotate-180":""}

`}

/>


</button>









{

open &&

<div

className="
absolute
left-0
top-10
z-50
w-[650px]
rounded-2xl
border
bg-white
p-6
shadow-2xl
"

>


<div

className="
grid
grid-cols-3
gap-6
"

>






{

categories.map((category)=>(


<div

key={category.slug}

>


<Link

href={`/category/${category.slug}`}

className="
font-bold
text-gray-900
hover:text-black
"

>

{category.name}

</Link>





<ul

className="
mt-3
space-y-2
"

>


{

category.sub.map((item)=>(


<li

key={item}

>


<Link

href={`/category/${category.slug}`}

className="
text-sm
text-gray-500
hover:text-black
"

>

{item}

</Link>


</li>


))


}


</ul>



</div>



))


}





</div>






</div>


}



</div>


);


}