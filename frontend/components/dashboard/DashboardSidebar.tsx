"use client";


import Link from "next/link";

import {
LayoutDashboard,
Package,
Heart,
User,
MapPin,
Settings,
LogOut
} from "lucide-react";



const menu=[

{
name:"Dashboard",
href:"/dashboard",
icon:<LayoutDashboard size={20}/>
},

{
name:"My Orders",
href:"/dashboard/orders",
icon:<Package size={20}/>
},

{
name:"Wishlist",
href:"/wishlist",
icon:<Heart size={20}/>
},

{
name:"Profile",
href:"/dashboard/profile",
icon:<User size={20}/>
},

{
name:"Address",
href:"/dashboard/address",
icon:<MapPin size={20}/>
},

{
name:"Settings",
href:"/dashboard/settings",
icon:<Settings size={20}/>
},

];



export default function DashboardSidebar(){


return (

<aside
className="
w-64
bg-white
border-r
min-h-screen
p-5
hidden
md:block
"
>


<h1
className="
text-2xl
font-bold
mb-8
"
>
NOPTRIX
</h1>



<nav className="
space-y-2
">


{
menu.map((item)=>(

<Link
key={item.name}
href={item.href}
className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-gray-700
hover:bg-black
hover:text-white
transition
"
>

{item.icon}

<span>
{item.name}
</span>


</Link>

))
}



<button
className="
flex
items-center
gap-3
px-4
py-3
text-red-500
hover:bg-red-50
rounded-xl
w-full
"
>

<LogOut size={20}/>

Logout

</button>


</nav>


</aside>

)

}