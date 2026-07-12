import Link from "next/link";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";



export default function ProductSection({

title,
products,
viewAll = false,
href="/shop"

}:{

title:string;
products:Product[];
viewAll?:boolean;
href?:string;

}){


return (

<section className="
mt-20
">


{/* Header */}

<div className="
mb-8
flex
items-center
justify-between
"

>


<div>

<h2 className="
text-2xl
font-bold
md:text-3xl
">

{title}

</h2>


<p className="
mt-1
text-sm
text-gray-500
">

{products.length} Products

</p>


</div>





{

viewAll &&

<Link

href={href}

className="
rounded-full
border
px-5
py-2
text-sm
font-medium
transition
hover:bg-black
hover:text-white
"

>

View All

</Link>

}



</div>









{/* Empty State */}

{

products.length===0 &&

<div className="
rounded-3xl
bg-gray-50
p-10
text-center
text-gray-500
"

>

No products found

</div>

}









{/* Product Grid */}

{

products.length>0 &&

<div className="
grid
grid-cols-2
gap-4
sm:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
"

>


{

products.map(

(product,index)=>(


<div

key={product._id}

className="
animate-in
fade-in
duration-500
"

style={{

animationDelay:`${index*50}ms`

}}

>


<ProductCard

product={product}

/>


</div>


)

)


}



</div>

}



</section>


);


}