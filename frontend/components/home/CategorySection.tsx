"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  getCategoryTree,
} from "@/services/category.service";

import type { Category } from "@/types/category";



export default function CategorySection(){


const [categories,setCategories] = useState<Category[]>([]);

const [openCategory,setOpenCategory] = useState<string | null>(null);

const [loading,setLoading] = useState(true);



useEffect(()=>{


getCategoryTree()

.then((data)=>{

setCategories(data);

})

.catch(console.log)

.finally(()=>{

setLoading(false);

});


},[]);





return (

<section className="py-16">


<div className="
max-w-7xl
mx-auto
px-6
">


<h2 className="
text-3xl
font-bold
mb-8
">

Shop By Category

</h2>



{
loading ? (

<p>
Loading categories...
</p>

)

:

(

<div className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-6
gap-5
">


{

categories.map((category)=>(


<div
key={category._id}
className="
relative
"
>


<button

onClick={()=>{

setOpenCategory(
openCategory === category._id
? null
: category._id
);

}}

className="
w-full
border
rounded-xl
p-6
flex
items-center
justify-center
gap-2
font-semibold
hover:shadow-lg
transition
"

>

{category.name}


{

category.children &&
category.children.length > 0 &&

<ChevronDown

size={18}

className={`
transition

${
openCategory === category._id
? "rotate-180"
:""
}

`}

/>

}


</button>





{

openCategory === category._id &&

category.children &&
category.children.length > 0 &&


<div className="
absolute
top-full
left-0
z-50
mt-2
w-full
rounded-xl
border
bg-white
p-3
shadow-xl
">


{

category.children.map((sub)=>(


<Link

key={sub._id}

href={`/shop?category=${sub.slug}`}

className="
block
rounded-lg
px-3
py-2
text-sm
hover:bg-gray-100
"

>

{sub.name}

</Link>


))


}


</div>


}



</div>


))


}


</div>

)

}


</div>


</section>

);

}