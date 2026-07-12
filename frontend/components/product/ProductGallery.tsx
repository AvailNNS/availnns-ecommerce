"use client";

import { useState } from "react";
import { Product } from "@/types/product";


export default function ProductGallery({
  product,
}:{
  product:Product;
}){


const [selectedImage,setSelectedImage] =
useState(
product.images?.[0]?.url || ""
);



return (

<div>


<div className="
bg-white
rounded-3xl
overflow-hidden
shadow
h-[550px]
">


<img

src={selectedImage}

alt={product.name}

className="
w-full
h-full
object-cover
transition
duration-500
hover:scale-105
"

/>


</div>





<div className="
flex
gap-4
mt-5
overflow-x-auto
">


{
product.images?.map(
(img,index)=>(


<button

key={
img.public_id || index
}

onClick={()=>setSelectedImage(img.url)}

className={`
w-24
h-24
rounded-xl
overflow-hidden
border-2
transition

${
selectedImage===img.url
?
"border-black"
:
"border-gray-200"
}

`}


>


<img

src={img.url}

alt="thumbnail"

className="
w-full
h-full
object-cover
"

/>


</button>


)

)

}


</div>


</div>

);

}