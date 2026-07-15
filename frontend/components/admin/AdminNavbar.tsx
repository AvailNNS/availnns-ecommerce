"use client";


import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";


import { useState } from "react";






export default function AdminNavbar(){


const [open,setOpen]=
useState(false);





return (

<header

className="
sticky
top-0
z-40
h-20
border-b
bg-white
flex
items-center
justify-between
px-6
lg:ml-72
"

>





{/* LEFT */}


<div

className="
flex
items-center
gap-4
"

>


<button

className="
lg:hidden
rounded-lg
p-2
hover:bg-gray-100
"

>

<Menu size={24}/>

</button>







<div

className="
hidden
md:flex
items-center
gap-3
rounded-xl
bg-gray-100
px-4
py-3
w-[350px]
"

>


<Search
size={18}
className="
text-gray-400
"
/>


<input

placeholder="
Search products, orders...
"

className="
bg-transparent
outline-none
w-full
text-sm
"

/>



</div>






</div>










{/* RIGHT */}



<div

className="
flex
items-center
gap-5
"

>






{/* NOTIFICATION */}



<button

className="
relative
rounded-full
p-2
hover:bg-gray-100
"

>


<Bell size={22}/>



<span

className="
absolute
right-1
top-1
h-2.5
w-2.5
rounded-full
bg-red-500
"

/>


</button>









{/* PROFILE */}



<div

className="
relative
"

>


<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-3
rounded-xl
px-3
py-2
hover:bg-gray-100
"

>



<div

className="
h-10
w-10
rounded-full
bg-black
text-white
flex
items-center
justify-center
font-bold
"

>

A

</div>




<div

className="
hidden
sm:block
text-left
"

>

<p

className="
text-sm
font-semibold
"

>

Admin

</p>


<p

className="
text-xs
text-gray-500
"

>

Administrator

</p>


</div>




<ChevronDown
size={18}
/>



</button>







{
open &&

<div

className="
absolute
right-0
mt-3
w-48
rounded-xl
border
bg-white
shadow-xl
p-2
"

>


<button

className="
w-full
text-left
rounded-lg
px-4
py-3
hover:bg-gray-100
text-sm
"

>

Profile

</button>



<button

className="
w-full
text-left
rounded-lg
px-4
py-3
hover:bg-gray-100
text-sm
text-red-500
"

>

Logout

</button>



</div>

}



</div>






</div>





</header>

);


}