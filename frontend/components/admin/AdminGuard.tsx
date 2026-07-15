"use client";


import {
 useEffect,
 useState
} from "react";


import {
 useRouter
} from "next/navigation";


import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";



export default function AdminGuard({
children
}:{
children:React.ReactNode;
}){


const router = useRouter();


const [checking,setChecking]=useState(true);



useEffect(()=>{


const check=()=>{


const user =
localStorage.getItem("user");


const token =
localStorage.getItem("token");



if(!user || !token){

router.replace("/admin/login");
return;

}



try{


const data =
JSON.parse(user);



if(data.role !== "admin"){

router.replace("/admin/login");
return;

}



setChecking(false);



}catch{


localStorage.removeItem("user");
localStorage.removeItem("token");

router.replace("/admin/login");


}


};



check();


},[router]);





if(checking){


return (

<div

className="
min-h-screen
flex
items-center
justify-center
bg-zinc-100
"

>

<div

className="
animate-pulse
text-gray-500
"

>

Checking Admin Access...

</div>


</div>

);


}






return (

<div

className="
min-h-screen
bg-zinc-100
flex
"

>


<AdminSidebar/>


<div

className="
flex-1
lg:ml-72
"

>


<AdminHeader/>


<main

className="
p-4
sm:p-6
lg:p-8
"

>

{children}

</main>


</div>


</div>

);


}