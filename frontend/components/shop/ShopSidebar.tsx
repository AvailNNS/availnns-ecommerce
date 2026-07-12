"use client";

import {
  X,
  Star,
} from "lucide-react";


interface Props {

open:boolean;

onClose:()=>void;


category:string;
setCategory:(value:string)=>void;


minPrice:string;
setMinPrice:(value:string)=>void;


maxPrice:string;
setMaxPrice:(value:string)=>void;


rating:number;
setRating:(value:number)=>void;


stockOnly:boolean;
setStockOnly:(value:boolean)=>void;


clearFilter:()=>void;

}



export default function ShopSidebar({

open,
onClose,

category,
setCategory,

minPrice,
setMinPrice,

maxPrice,
setMaxPrice,

rating,
setRating,

stockOnly,
setStockOnly,

clearFilter


}:Props){



return (

<>


{
open &&

<div

onClick={onClose}

className="
fixed
inset-0
z-40
bg-black/40
lg:hidden
"

/>

}






<aside

className={`
fixed
left-0
top-0
z-50
h-full
w-80
overflow-y-auto
bg-white
p-6
shadow-xl
transition-transform

lg:static
lg:h-fit
lg:w-full
lg:rounded-3xl
lg:shadow-sm


${
open
?
"translate-x-0"
:
"-translate-x-full"
}

lg:translate-x-0

`}

>





<div className="
mb-6
flex
items-center
justify-between
">


<h2 className="
text-xl
font-bold
">

Filters

</h2>



<button

onClick={onClose}

className="lg:hidden"

>

<X/>

</button>



</div>









{/* CATEGORY */}

<div className="
border-b
pb-6
">


<h3 className="
mb-4
font-semibold
">

Category

</h3>



<div className="
space-y-3
text-sm
">


{
[
"all",
"Electronics",
"Fashion",
"Home"
].map((item)=>(


<label

key={item}

className="
flex
cursor-pointer
gap-3
"

>


<input

type="radio"

checked={
category===item
}

onChange={()=>
setCategory(item)
}

/>



<span>

{
item==="all"
?
"All Products"
:
item
}

</span>



</label>


))

}


</div>


</div>









{/* PRICE */}

<div className="
mt-6
border-b
pb-6
">


<h3 className="
mb-4
font-semibold
">

Price

</h3>



<div className="
flex
gap-3
">


<input

type="number"

placeholder="Min"

value={minPrice}

onChange={(e)=>
setMinPrice(e.target.value)
}

className="
w-full
rounded-lg
border
px-3
py-2
"

/>



<input

type="number"

placeholder="Max"

value={maxPrice}

onChange={(e)=>
setMaxPrice(e.target.value)
}

className="
w-full
rounded-lg
border
px-3
py-2
"

/>


</div>


</div>









{/* RATING */}

<div className="
mt-6
border-b
pb-6
">


<h3 className="
mb-4
font-semibold
">

Rating

</h3>



{

[5,4,3,2].map((item)=>(


<button

key={item}

onClick={()=>setRating(item)}

className="
mb-3
flex
items-center
gap-2
"

>


{

Array.from({
length:item
}).map((_,i)=>(

<Star

key={i}

size={16}

fill="currentColor"

className="
text-yellow-500
"

/>

))

}



<span>

& Up

</span>



</button>


))


}


</div>









{/* STOCK */}

<div className="
mt-6
">


<label className="
flex
items-center
gap-3
cursor-pointer
">


<input

type="checkbox"

checked={stockOnly}

onChange={(e)=>
setStockOnly(e.target.checked)
}

/>


<span>

Only In Stock

</span>


</label>


</div>









{/* CLEAR */}

<button

onClick={clearFilter}

className="
mt-8
w-full
rounded-xl
bg-black
py-3
text-white
font-semibold
hover:bg-gray-800
"

>

Clear Filter

</button>







</aside>


</>


);

}