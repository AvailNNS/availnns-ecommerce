"use client";


import {
useEffect,
useState
} from "react";


import {
Package,
Users,
FolderTree,
ShoppingCart,
DollarSign,
Star,
Flame,
AlertTriangle,
Plus,
Upload,
ListOrdered
} from "lucide-react";


import Link from "next/link";


import {
getDashboardStats
} from "@/services/dashboard.service";


import useAdminAuth from "@/hooks/useAdminAuth";



type DashboardStats = {

totalProducts:number;

totalUsers:number;

totalCategories:number;

totalOrders:number;

totalRevenue:number;

featuredProducts:number;

bestSellerProducts:number;

lowStockProducts:number;

};





export default function AdminDashboardPage(){


const {
loading:authLoading
}=useAdminAuth();



const [stats,setStats]=
useState<DashboardStats|null>(null);



const [error,setError]=
useState("");





useEffect(()=>{


const loadDashboard=async()=>{


try{


const token =
localStorage.getItem("token");


if(!token){

setError("Unauthorized");

return;

}



const data =
await getDashboardStats(token);



setStats(data);



}catch(err:any){


setError(
err.message ||
"Dashboard loading failed"
);


}



};




if(!authLoading){

loadDashboard();

}


},[authLoading]);







if(authLoading || !stats){


return (

<div className="
min-h-screen
flex
items-center
justify-center
">

Loading dashboard...

</div>

);


}





if(error){


return (

<div className="
rounded-xl
bg-red-100
p-5
text-red-600
">

{error}

</div>

);


}






const cards=[


{
title:"Products",
value:stats.totalProducts,
icon:<Package/>,
color:"bg-blue-50"
},


{
title:"Customers",
value:stats.totalUsers,
icon:<Users/>,
color:"bg-green-50"
},


{
title:"Categories",
value:stats.totalCategories,
icon:<FolderTree/>,
color:"bg-purple-50"
},


{
title:"Orders",
value:stats.totalOrders,
icon:<ShoppingCart/>,
color:"bg-orange-50"
},


{
title:"Revenue",
value:`$${stats.totalRevenue}`,
icon:<DollarSign/>,
color:"bg-yellow-50"
},


{
title:"Featured",
value:stats.featuredProducts,
icon:<Star/>,
color:"bg-pink-50"
},


{
title:"Best Sellers",
value:stats.bestSellerProducts,
icon:<Flame/>,
color:"bg-red-50"
},


{
title:"Low Stock",
value:stats.lowStockProducts,
icon:<AlertTriangle/>,
color:"bg-red-100"
},


];







return (

<div className="space-y-10">





<div>


<h1 className="
text-4xl
font-bold
">

Dashboard

</h1>


<p className="
mt-2
text-gray-500
">

Overview of your ecommerce store

</p>


</div>







{/* QUICK ACTION */}


<div className="
grid
md:grid-cols-3
gap-5
">


<Link

href="/admin/products/add"

className="
flex
items-center
gap-3
rounded-2xl
bg-black
p-5
text-white
hover:scale-[1.02]
transition
"

>

<Plus/>

Add Product

</Link>




<Link

href="/admin/products"

className="
flex
items-center
gap-3
rounded-2xl
bg-white
border
p-5
hover:shadow
"

>

<ListOrdered/>

Manage Products

</Link>





<Link

href="/admin/categories"

className="
flex
items-center
gap-3
rounded-2xl
bg-white
border
p-5
hover:shadow
"

>

<Upload/>

Manage Categories

</Link>



</div>








{/* STAT CARDS */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
">


{

cards.map((card,index)=>(


<div

key={index}

className="
rounded-3xl
bg-white
border
p-6
shadow-sm
hover:shadow-xl
transition
"

>


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-sm
text-gray-500
">

{card.title}

</p>


<h2 className="
mt-3
text-3xl
font-bold
">

{card.value}

</h2>


</div>



<div className={`
rounded-2xl
p-4
${card.color}
`}>

{card.icon}

</div>



</div>



</div>


))


}


</div>








{/* ALERT SECTION */}


{

stats.lowStockProducts > 0 &&


<div className="
rounded-3xl
border
bg-red-50
p-6
flex
items-center
gap-4
">


<AlertTriangle
className="text-red-600"
/>


<div>


<h3 className="
font-bold
text-lg
">

Low Stock Alert

</h3>


<p className="
text-gray-600
">

{stats.lowStockProducts}
products need restocking

</p>


</div>



</div>


}








{/* STORE HEALTH */}


<div className="
rounded-3xl
bg-white
border
p-8
">


<h2 className="
text-xl
font-bold
mb-6
">

Store Performance

</h2>




<div className="
grid
md:grid-cols-3
gap-6
">



<div>

<p className="text-gray-500">
Revenue
</p>

<h3 className="text-2xl font-bold">
${stats.totalRevenue}
</h3>

</div>




<div>

<p className="text-gray-500">
Best Seller Products
</p>

<h3 className="text-2xl font-bold">
{stats.bestSellerProducts}
</h3>

</div>




<div>

<p className="text-gray-500">
Inventory Warning
</p>

<h3 className="text-2xl font-bold">
{stats.lowStockProducts}
</h3>

</div>




</div>


</div>







</div>

);


}