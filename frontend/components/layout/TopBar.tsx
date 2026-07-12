"use client";

import Link from "next/link";

import {
  Phone,
  Truck,
  Globe,
  DollarSign,
  ChevronDown,
} from "lucide-react";



export default function TopBar(){


return (

<div className="
bg-zinc-950
text-white
text-xs
">


<div className="
mx-auto
flex
h-10
max-w-7xl
items-center
justify-between
px-6
">








{/* LEFT */}

<div className="
flex
items-center
gap-6
">


<div className="
hidden
items-center
gap-2
sm:flex
">


<div className="
flex
h-6
w-6
items-center
justify-center
rounded-full
bg-white/10
">

<Truck size={14}/>

</div>


<span className="
text-gray-200
">

Free shipping over $100

</span>


</div>








<div className="
flex
items-center
gap-2
">


<div className="
flex
h-6
w-6
items-center
justify-center
rounded-full
bg-white/10
">

<Phone size={14}/>

</div>


<span className="
text-gray-200
">

+880 1234-567890

</span>


</div>



</div>









{/* RIGHT */}

<div className="
flex
items-center
gap-5
">


<Link

href="/track-order"

className="
text-gray-200
transition
hover:text-white
"

>

Track Order

</Link>







<div className="
hidden
items-center
gap-1
sm:flex
cursor-pointer
hover:text-gray-300
">


<Globe size={14}/>

<span>
EN
</span>


<ChevronDown size={12}/>


</div>








<div className="
hidden
items-center
gap-1
sm:flex
cursor-pointer
hover:text-gray-300
">


<DollarSign size={14}/>


<span>
USD
</span>


<ChevronDown size={12}/>


</div>






</div>







</div>


</div>


);


}