"use client";


import React from "react";

import ProtectedRoute 
from "@/components/auth/ProtectedRoute";

import DashboardSidebar
from "@/components/dashboard/DashboardSidebar";



export default function DashboardLayout({

children,

}:{

children:React.ReactNode;

}){


return (


<ProtectedRoute>


<div

className="
min-h-screen
bg-gray-50
flex
"

>



{/* Sidebar */}

<DashboardSidebar />





{/* Main Content */}

<main

className="
flex-1
min-h-screen
p-4
md:p-8
overflow-hidden
"

>


{children}


</main>





</div>


</ProtectedRoute>


);


}