"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Flame,
  Sparkles,
  Tag,
  Phone,
} from "lucide-react";

import CategoriesDropdown from "./CategoriesDropdown";



const navItems = [

{
name:"Home",
href:"/"
},

{
name:"Shop",
href:"/shop"
},

{
name:"Best Sellers",
href:"/best-sellers",
icon:"flame"
},

{
name:"New Arrivals",
href:"/new-arrivals",
icon:"sparkles"
},

{
name:"Deals",
href:"/deals",
icon:"tag"
},

{
name:"Contact",
href:"/contact",
icon:"phone"
},


];





export default function Navigation(){


const pathname = usePathname();



const isActive=(href:string)=>{

if(href === "/"){

return pathname === "/";

}


return pathname.startsWith(href);

};




const renderIcon=(icon?:string)=>{


switch(icon){

case "flame":
return <Flame size={15}/>;

case "sparkles":
return <Sparkles size={15}/>;

case "tag":
return <Tag size={15}/>;

case "phone":
return <Phone size={15}/>;

default:
return null;

}


};







return (

<nav className="
border-b
bg-white
z-30
">


<div className="
mx-auto
max-w-7xl
px-6
">


<ul className="
flex
items-center
gap-8
overflow-x-auto
py-4
scrollbar-hide
">



{

navItems.map((item)=>(


<li
key={item.href}
className="shrink-0"
>


<Link

href={item.href}

className={`
relative
flex
items-center
gap-2
text-sm
font-semibold
transition

${
isActive(item.href)
?
"text-black"
:
"text-gray-500 hover:text-black"

}

`}

>


{renderIcon(item.icon)}


{item.name}



{

isActive(item.href)

&&

<span

className="
absolute
left-0
right-0
bottom-[-17px]
h-[3px]
rounded-full
bg-black
"

/>

}



</Link>



</li>


))


}






<li className="shrink-0">

<CategoriesDropdown />

</li>




</ul>


</div>


</nav>


);


}