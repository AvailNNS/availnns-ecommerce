"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  Trophy,
  Package,
} from "lucide-react";


import {
  getTopProducts,
} from "@/services/dashboard.service";





export default function TopProducts(){



const [products,setProducts] =
useState<any[]>([]);



const [loading,setLoading] =
useState(true);








useEffect(()=>{


const loadProducts = async()=>{


try{


const token =
localStorage.getItem("token");


if(!token)
return;



const data =
await getTopProducts(token);



setProducts(data);



}catch(error){


console.log(
"Top product error",
error
);



}finally{


setLoading(false);


}


};




loadProducts();



},[]);









if(loading){


return (

<div className="
rounded-3xl
border
bg-white
p-6
h-96
flex
items-center
justify-center
">

Loading products...

</div>

);


}










return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<div className="
mb-6
flex
items-center
gap-3
">


<div className="
rounded-xl
bg-yellow-100
p-3
">

<Trophy
size={22}
/>

</div>



<div>


<h2 className="
text-xl
font-bold
">

Top Products

</h2>


<p className="
text-sm
text-gray-500
">

Best selling items

</p>


</div>



</div>









<div className="
space-y-4
">


{

products.length===0 ?


<div className="
py-10
text-center
text-gray-500
">

No sales data

</div>



:


products.map(
(product,index)=>(



<div

key={product._id}

className="
flex
items-center
justify-between
rounded-2xl
bg-gray-50
p-4
"

>


<div className="
flex
items-center
gap-4
">


<div className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-black
text-white
font-bold
">

{index+1}

</div>



<div>


<h3 className="
font-semibold
">

{product.name}

</h3>



<p className="
text-sm
text-gray-500
">

Sold: {product.totalSold}

</p>


</div>



</div>






<div className="
flex
items-center
gap-2
font-bold
">


<Package
size={18}
/>


${product.revenue}


</div>





</div>


)


)



}



</div>




</div>


);


}