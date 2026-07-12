"use client";

import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";


import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";



export default function Footer(){


return (

<footer className="
bg-zinc-950
text-white
mt-20
">





<div className="
mx-auto
max-w-7xl
px-6
py-14
">





<div className="
grid
grid-cols-1
gap-10
sm:grid-cols-2
lg:grid-cols-4
">









{/* BRAND */}

<div>


<h2 className="
text-3xl
font-bold
tracking-wide
">

NOPTRIX

</h2>



<p className="
mt-4
text-sm
leading-7
text-gray-400
">

Your professional online shopping
destination for quality products.

</p>







<div className="
mt-6
flex
gap-3
">



<a

href="#"

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white/10
transition
hover:-translate-y-1
hover:bg-white/20
"

>

<FaFacebook size={18}/>

</a>





<a

href="#"

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white/10
transition
hover:-translate-y-1
hover:bg-white/20
"

>

<FaInstagram size={18}/>

</a>






<a

href="#"

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white/10
transition
hover:-translate-y-1
hover:bg-white/20
"

>

<FaTwitter size={18}/>

</a>



</div>


</div>












{/* SHOP */}

<div>


<h3 className="
mb-5
text-lg
font-semibold
">

Shop

</h3>




<ul className="
space-y-3
text-sm
text-gray-400
">


<li>

<Link
href="/shop"
className="hover:text-white transition"
>

All Products

</Link>

</li>




<li>

<Link
href="/best-sellers"
className="hover:text-white transition"
>

Best Sellers

</Link>

</li>





<li>

<Link
href="/new-arrivals"
className="hover:text-white transition"
>

New Arrivals

</Link>

</li>





<li>

<Link
href="/deals"
className="hover:text-white transition"
>

Deals

</Link>

</li>


</ul>


</div>












{/* CUSTOMER SERVICE */}

<div>


<h3 className="
mb-5
text-lg
font-semibold
">

Customer Service

</h3>



<ul className="
space-y-3
text-sm
text-gray-400
">



<li>

<Link
href="/track-order"
className="hover:text-white transition"
>

Track Order

</Link>

</li>





<li>

<Link
href="/returns"
className="hover:text-white transition"
>

Returns & Refunds

</Link>

</li>





<li>

<Link
href="/faq"
className="hover:text-white transition"
>

FAQ

</Link>

</li>





<li>

<Link
href="/contact"
className="hover:text-white transition"
>

Contact Us

</Link>

</li>



</ul>



</div>












{/* CONTACT */}

<div>


<h3 className="
mb-5
text-lg
font-semibold
">

Contact

</h3>






<div className="
space-y-5
text-sm
text-gray-400
">





<p className="
flex
items-center
gap-3
">

<Phone size={18}/>

+880 1234-567890

</p>







<p className="
flex
items-center
gap-3
">

<Mail size={18}/>

support@noptrix.com

</p>







<p className="
flex
items-center
gap-3
">

<MapPin size={18}/>

Dhaka, Bangladesh

</p>





</div>


</div>









</div>









{/* COPYRIGHT */}


<div className="
mt-14
border-t
border-white/10
pt-6
text-center
text-sm
text-gray-500
">


© 2026 NOPTRIX. All rights reserved.


</div>






</div>


</footer>


);


}