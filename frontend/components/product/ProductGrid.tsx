import { Product } from "@/types/product";
import ProductCard from "./ProductCard";


interface Props {

products:Product[];

loading?:boolean;

}



export default function ProductGrid({

products,

loading=false

}:Props){



if(loading){

return (

<div className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
">


{

Array.from({
length:10
}).map((_,i)=>(


<div

key={i}

className="
h-96
rounded-3xl
bg-white
animate-pulse
shadow-sm
"

/>


))


}


</div>

);


}







if(!products.length){

return (

<div className="
rounded-3xl
bg-white
p-10
text-center
shadow-sm
">

<h2 className="
text-xl
font-bold
">

No Products Found

</h2>


<p className="
mt-2
text-gray-500
">

Try changing your filter

</p>


</div>

);


}









return (

<div className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
">

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

animationDelay:`${index*40}ms`

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

);


}