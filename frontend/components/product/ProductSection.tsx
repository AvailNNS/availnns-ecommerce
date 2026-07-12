import { Product } from "@/types/product";
import ProductCard from "./ProductCard";


export default function ProductSection({

title,
products

}:{

title:string;
products:Product[];

}){


if(!products.length)
return null;



return (

<section className="
mt-20
">


<h2 className="
text-3xl
font-bold
mb-8
">

{title}

</h2>





<div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
">


{
products.map(
(product)=>(

<ProductCard

key={product._id}

product={product}

/>

)

)

}



</div>


</section>


);


}