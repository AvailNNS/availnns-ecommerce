"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthContext";



const menu = [

  {
    name:"Dashboard",
    href:"/dashboard",
    icon:<LayoutDashboard size={20}/>,
  },

  {
    name:"My Orders",
    href:"/dashboard/orders",
    icon:<Package size={20}/>,
  },

  {
    name:"Wishlist",
    href:"/wishlist",
    icon:<Heart size={20}/>,
  },

  {
    name:"Profile",
    href:"/dashboard/profile",
    icon:<User size={20}/>,
  },

  {
    name:"Address",
    href:"/dashboard/address",
    icon:<MapPin size={20}/>,
  },

  {
    name:"Settings",
    href:"/dashboard/settings",
    icon:<Settings size={20}/>,
  },

];





export default function DashboardSidebar(){


const pathname =
usePathname();



const {
  user,
  logout,
} = useAuth();





const handleLogout = ()=>{


const confirmLogout =
window.confirm(
  "Are you sure you want to logout?"
);



if(!confirmLogout){

return;

}



logout();



};






return (

<aside

className="
hidden
md:flex
w-72
min-h-screen
bg-white
border-r
flex-col
p-6
"

>


{/* Logo */}

<div className="mb-8">

<h1

className="
text-3xl
font-black
tracking-tight
"

>

NOPTRIX

</h1>


<p

className="
text-xs
text-gray-400
mt-1
"

>

Customer Dashboard

</p>


</div>







{/* User Card */}

<div

className="
bg-gray-50
rounded-2xl
p-4
mb-6
"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
w-12
h-12
rounded-xl
bg-black
text-white
overflow-hidden
flex
items-center
justify-center
"

>


{

user?.avatar ? (

<img

src={user.avatar}

alt="avatar"

className="
w-full
h-full
object-cover
"

/>

)

:

(

<User size={22}/>

)

}


</div>





<div>


<h3

className="
font-semibold
text-sm
"

>

{
user?.name || "User"
}

</h3>


<div

className="
flex
items-center
gap-1
text-xs
text-green-600
"

>


<ShieldCheck size={13}/>


Verified


</div>


</div>


</div>


</div>









{/* Menu */}


<nav

className="
space-y-2
flex-1
"

>


{

menu.map((item)=>(


<Link

key={item.name}

href={item.href}


className={`

flex

items-center

gap-3

px-4

py-3

rounded-xl

transition

font-medium

text-sm


${
pathname === item.href

?

"bg-black text-white shadow-lg"

:

"text-gray-700 hover:bg-gray-100"

}

`}


>


{item.icon}


<span>

{item.name}

</span>


</Link>


))


}


</nav>









{/* Logout */}


<button

onClick={handleLogout}


className="

mt-6

flex

items-center

gap-3

px-4

py-3

rounded-xl

text-red-500

hover:bg-red-50

transition

font-medium

"


>


<LogOut size={20}/>


Logout


</button>




</aside>


);


}