"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  Loader2,
  X,
} from "lucide-react";


import {
  searchProducts
} from "@/services/product.service";


import {
  Product
} from "@/types/product";




export default function SearchBar(){



const [keyword,setKeyword]=useState("");

const [products,setProducts]=useState<Product[]>([]);

const [loading,setLoading]=useState(false);

const [open,setOpen]=useState(false);



const searchRef =
useRef<HTMLDivElement>(null);







useEffect(()=>{


const handleClick=(event:MouseEvent)=>{


if(
searchRef.current
&&
!searchRef.current.contains(
event.target as Node
)
){

setOpen(false);

}


};



document.addEventListener(
"mousedown",
handleClick
);



return()=>{

document.removeEventListener(
"mousedown",
handleClick
);

};


},[]);









useEffect(()=>{


if(!keyword.trim()){

setProducts([]);

return;

}





const timer =
setTimeout(async()=>{


try{


setLoading(true);


const data =
await searchProducts(keyword);


setProducts(data || []);

setOpen(true);



}catch(error){


console.log(error);


}finally{


setLoading(false);


}


},400);




return()=>clearTimeout(timer);



},[keyword]);









return (

<div

ref={searchRef}

className="
relative
w-full
max-w-xl
"

>






<div className="
flex
items-center
rounded-full
border
bg-white
px-4
py-2
shadow-sm
focus-within:ring-2
focus-within:ring-black/20
">


<Search

size={20}

className="
text-gray-400
shrink-0
"

/>




<input

type="text"

placeholder="Search products..."

value={keyword}

onFocus={()=>
keyword && setOpen(true)
}

onChange={(e)=>
setKeyword(e.target.value)
}

className="
w-full
bg-transparent
px-3
outline-none
text-sm
"

/>





{

keyword &&

<button

onClick={()=>{

setKeyword("");

setProducts([]);

}}

>

<X

size={18}

className="
text-gray-400
"

/>


</button>


}



</div>









{

open && keyword &&

<div

className="
absolute
left-0
right-0
top-14
z-50
overflow-hidden
rounded-2xl
border
bg-white
shadow-2xl
"

>





{

loading ?

(

<div className="
flex
items-center
justify-center
gap-2
p-5
text-sm
text-gray-500
">


<Loader2

size={18}

className="
animate-spin
"

/>


Searching...


</div>

)

:

products.length===0

?

(

<p className="
p-5
text-center
text-sm
text-gray-500
">

No products found

</p>

)

:

(

<div className="
max-h-96
overflow-y-auto
">


{

products.map((product)=>(


<Link

key={product._id}

href={`/products/${product._id}`}

onClick={()=>setOpen(false)}

className="
flex
items-center
gap-4
border-b
p-3
transition
hover:bg-gray-50
"

>



<img

src={
product.images?.[0]?.url
||
"/placeholder.png"
}

alt={product.name}

className="
h-14
w-14
rounded-xl
object-cover
"

/>





<div className="
flex-1
min-w-0
">


<h3 className="
truncate
font-semibold
text-sm
">

{product.name}

</h3>




<p className="
text-xs
text-gray-500
">

{

typeof product.category==="object"
?
product.category.name
:
""

}

</p>



<p className="
mt-1
font-bold
text-sm
">

$

{
product.discountPrice
||
product.price
}

</p>



</div>



</Link>


))


}


</div>


)


}




</div>


}



</div>


);


}