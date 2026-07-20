"use client";


import {
  User,
  ShieldCheck,
  Sparkles,
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
rounded-3xl
shadow-sm
border
p-6
md:p-8
mb-6
flex
flex-col
md:flex-row
md:items-center
justify-between
gap-6
"
>



{/* User Info */}

<div
className="
flex
items-center
gap-5
"
>


<div
className="
w-20
h-20
rounded-2xl
bg-black
text-white
flex
items-center
justify-center
shadow-lg
"
>

{
user?.avatar
?

<img
src={user.avatar}
alt="avatar"
className="
w-full
h-full
rounded-2xl
object-cover
"
/>

:

<User size={36}/>

}


</div>




<div>


<div
className="
flex
items-center
gap-2
"
>


<h1
className="
text-2xl
md:text-3xl
font-bold
"
>

Hello, {user?.name}

</h1>


<Sparkles
size={22}
/>


</div>



<p
className="
text-gray-500
mt-1
"
>

Welcome back to NOPTRIX account

</p>



<p
className="
text-sm
text-gray-400
mt-1
"
>

{user?.email}

</p>



</div>



</div>







{/* Account Status */}

<div
className="
flex
items-center
gap-3
bg-gray-50
rounded-2xl
px-5
py-4
"
>


<div
className="
w-10
h-10
rounded-xl
bg-green-100
text-green-600
flex
items-center
justify-center
"
>

<ShieldCheck size={22}/>

</div>



<div>


<p
className="
text-sm
text-gray-500
"
>

Account Status

</p>



<p
className="
font-semibold
"
>

Verified User

</p>


</div>



</div>






</div>

);

}