"use client";

import {
  useState
} from "react";

import {
  Heart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


import { Product } from "@/types/product";


import {
  useWishlist
} from "@/context/WishlistContext";



export default function ProductGallery({

product,

}:{

product:Product;

}){


const images =
product.images?.length

?

product.images

:

[
{
url:"/placeholder.png",
public_id:"default"
}
];




const [selectedIndex,setSelectedIndex] =
useState(0);



const [zoom,setZoom] =
useState(false);



const {

addToWishlist,
removeFromWishlist,
isInWishlist

}=useWishlist();





const wish =
isInWishlist(product._id);






const nextImage = ()=>{


if(selectedIndex < images.length-1){

setSelectedIndex(
selectedIndex+1
);

}

};





const prevImage = ()=>{


if(selectedIndex > 0){

setSelectedIndex(
selectedIndex-1
);

}

};









return (

<div
className="
space-y-5
"
>






{/* MAIN IMAGE */}



<div

className="
group
relative
h-[550px]
overflow-hidden
rounded-3xl
bg-white
shadow
"

onMouseEnter={()=>setZoom(true)}

onMouseLeave={()=>setZoom(false)}

>





<img

src={
images[selectedIndex]?.url
}

alt={product.name}

className={`
h-full
w-full
object-cover
transition
duration-500

${
zoom
?
"scale-110"
:
"scale-100"
}

`}

/>







{/* WISHLIST */}



<button

onClick={()=>{


if(wish){

removeFromWishlist(
product._id
);


}else{


addToWishlist({

_id:product._id,

name:product.name,

price:
product.discountPrice ||
product.price,

image:
images[0].url

});


}

}}

className="
absolute
right-5
top-5
rounded-full
bg-white
p-3
shadow-xl
transition
hover:scale-110
"

>


<Heart

size={25}

className={

wish

?

"fill-red-500 text-red-500"

:

"text-gray-700"

}

/>


</button>









{/* IMAGE COUNT */}



<div

className="
absolute
bottom-5
left-5
rounded-full
bg-black/70
px-4
py-2
text-sm
text-white
"

>

{selectedIndex+1}/{images.length}

</div>









{/* PREVIOUS */}



{

selectedIndex>0 &&


<button

onClick={prevImage}

className="
absolute
left-4
top-1/2
rounded-full
bg-white
p-3
shadow
"

>

<ChevronLeft/>

</button>

}









{/* NEXT */}



{

selectedIndex < images.length-1 &&


<button

onClick={nextImage}

className="
absolute
right-4
top-1/2
rounded-full
bg-white
p-3
shadow
"

>

<ChevronRight/>

</button>

}





<div

className="
absolute
bottom-5
right-5
rounded-full
bg-white
p-3
shadow
"

>

<ZoomIn size={20}/>

</div>







</div>









{/* THUMBNAILS */}



<div

className="
flex
gap-4
overflow-x-auto
"

>


{

images.map((img,index)=>(


<button

key={
img.public_id || index
}

onClick={()=>setSelectedIndex(index)}

className={`
relative
h-24
w-24
shrink-0
overflow-hidden
rounded-xl
border-2
transition


${
selectedIndex===index

?

"border-black scale-105"

:

"border-gray-200"

}

`}

>


<img

src={img.url}

alt="thumbnail"

className="
h-full
w-full
object-cover
"

/>


</button>


))


}



</div>





</div>


);


}