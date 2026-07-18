"use client";


import {
User
} from "lucide-react";



export default function DashboardHeader({
user
}:{
user:any;
}){


return (

<div
className="
bg-white
rounded-2xl
p-6
shadow-sm
flex
items-center
gap-5
"
>


<div
className="
w-16
h-16
rounded-full
bg-black
text-white
flex
items-center
justify-center
"
>

<User size={30}/>

</div>



<div>

<h2
className="
text-2xl
font-bold
"
>

{user?.name}

</h2>


<p
className="
text-gray-500
"
>

{user?.email}

</p>


</div>


</div>

)

}