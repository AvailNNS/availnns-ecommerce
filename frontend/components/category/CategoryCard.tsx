import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";


interface Props {
  category: Category;
}


export default function CategoryCard({
  category,
}: Props) {


return (

<Link

href={`/category/${category.slug}`}

className="
group
overflow-hidden
rounded-2xl
border
border-zinc-200
bg-white
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"

>


<div

className="
relative
h-48
w-full
overflow-hidden
bg-zinc-100
"

>


{

category.image ? (

<Image

src={category.image}

alt={category.name}

fill

sizes="(max-width:768px) 100vw, 300px"

className="
object-cover
transition-transform
duration-500
group-hover:scale-110
"

/>

)

:

(

<div

className="
flex
h-full
items-center
justify-center
text-sm
text-zinc-400
"

>

No Image

</div>

)

}



</div>





<div className="p-5">


<h2

className="
text-lg
font-bold
text-zinc-900
group-hover:text-black
"

>

{category.name}

</h2>





{

category.description && (

<p

className="
mt-2
line-clamp-2
text-sm
text-zinc-500
"

>

{category.description}

</p>

)

}






{

category.children &&
category.children.length > 0 && (

<div

className="
mt-4
inline-flex
rounded-full
bg-zinc-100
px-3
py-1
text-xs
font-medium
text-zinc-600
"

>

{category.children.length} Subcategories

</div>

)

}



</div>



</Link>


);


}