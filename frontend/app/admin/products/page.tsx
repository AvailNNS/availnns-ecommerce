"use client";


import {
useEffect,
useState
} from "react";


import Link from "next/link";

import Image from "next/image";


import {
Search,
Edit,
Trash2,
Plus,
Package,
Star,
TrendingUp,
AlertTriangle,
BadgeCheck
} from "lucide-react";


import {
toast
} from "sonner";


import {
getAdminProducts,
removeProduct
} from "@/services/product.service";


import {
Product
} from "@/types/product";





export default function AdminProductsPage(){


const [products,setProducts] =
useState<Product[]>([]);


const [loading,setLoading] =
useState(true);


const [search,setSearch] =
useState("");





const loadProducts = async()=>{


try{


const token =
localStorage.getItem("token");


if(!token)
return;



const data =
await getAdminProducts(token);


setProducts(data);



}catch(error){

console.log(error);

toast.error(
"Failed to load products"
);


}
finally{

setLoading(false);

}


};







useEffect(()=>{


loadProducts();


},[]);









const deleteProduct = async(
id:string
)=>{


const ok =
confirm(
"Delete this product?"
);


if(!ok)
return;



try{


const token =
localStorage.getItem("token");



if(!token)
return;



await removeProduct(
id,
token
);



setProducts(prev=>

prev.filter(
item=>item._id!==id
)

);



toast.success(
"Product deleted"
);



}catch(error){


toast.error(
"Delete failed"
);


}


};









const filteredProducts =
products.filter(product=>

product.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);







if(loading){


return (

<div className="
grid
md:grid-cols-3
gap-6
p-6
">

{

[1,2,3,4,5,6].map(i=>(

<div

key={i}

className="
h-80
rounded-3xl
bg-gray-200
animate-pulse
"

/>

))

}

</div>

);


}










return (

<div className="
space-y-8
">







{/* HEADER */}


<div className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
">


<div>


<h1 className="
text-3xl
font-black
">

Products

</h1>


<p className="
text-gray-500
">

Manage your store inventory

</p>


</div>





<Link

href="/admin/products/add"

className="
flex
items-center
justify-center
gap-2
rounded-2xl
bg-black
px-6
py-3
text-white
font-semibold
hover:opacity-90
"

>

<Plus size={18}/>

Add Product


</Link>



</div>









{/* STATS */}


<div className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
">



<StatCard

title="Total Products"

value={products.length}

icon={Package}

/>



<StatCard

title="Featured"

value={
products.filter(
p=>p.isFeatured
).length
}

icon={Star}

/>



<StatCard

title="Best Sellers"

value={
products.filter(
p=>p.isBestSeller
).length
}

icon={TrendingUp}

/>



<StatCard

title="Low Stock"

value={
products.filter(
p=>p.stock < 10
).length
}

icon={AlertTriangle}

/>



</div>









{/* SEARCH */}


<div className="
relative
max-w-xl
">


<Search

className="
absolute
left-4
top-3.5
text-gray-400
"

/>


<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="
Search product...
"

className="
w-full
rounded-2xl
border
bg-white
py-3
pl-12
pr-5
outline-none
focus:ring-2
focus:ring-black
"

/>


</div>









{/* EMPTY */}



{

filteredProducts.length===0 &&

<div className="
rounded-3xl
bg-white
p-12
text-center
shadow
">


<Package

size={50}

className="
mx-auto
mb-4
text-gray-400
"

/>


<h2 className="
text-xl
font-bold
">

No Products Found

</h2>


</div>


}










{/* PRODUCTS GRID */}



<div className="
grid
gap-6
md:grid-cols-2
xl:grid-cols-3
">



{

filteredProducts.map(product=>(


<div

key={product._id}

className="
group
rounded-3xl
border
bg-white
p-5
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
"

>







{/* IMAGE */}


<div className="
relative
h-60
overflow-hidden
rounded-2xl
bg-gray-100
">


<Image

src={
product.images?.[0]?.url ||
"/placeholder.png"
}

alt={product.name}

fill

className="
object-cover
transition
group-hover:scale-105
"

/>







{
product.discountPrice>0 &&

<span className="
absolute
left-3
top-3
rounded-full
bg-red-500
px-3
py-1
text-xs
text-white
">

SALE

</span>

}



</div>









<h2 className="
mt-5
truncate
text-xl
font-black
">

{product.name}

</h2>




<p className="
text-sm
text-gray-500
">

{
typeof product.category==="object"
?
product.category.name
:
""
}

</p>








<div className="
mt-3
flex
items-center
gap-3
">


{

product.discountPrice>0 ?

<>

<span className="
text-xl
font-black
">

${product.discountPrice}

</span>


<span className="
line-through
text-gray-400
">

${product.price}

</span>


</>

:

<span className="
text-xl
font-black
">

${product.price}

</span>

}


</div>









<div className="
mt-4
flex
flex-wrap
gap-2
">


{
product.isFeatured &&

<Badge text="Featured"/>

}


{
product.isBestSeller &&

<Badge text="Best Seller"/>

}



{
product.isNewArrival&&

<Badge text="New"/>

}


</div>









<div className="
mt-5
flex
items-center
justify-between
">


<p>

Stock:

<span className={

product.stock < 10

?

"text-red-500 font-bold ml-2"

:

"text-green-600 font-bold ml-2"

}>

{product.stock}

</span>


</p>



{
product.stock <10 &&

<AlertTriangle

size={18}

className="text-red-500"

/>

}



</div>










<div className="
mt-5
flex
gap-3
">


<Link

href={
`/admin/products/edit/${product._id}`
}

className="
flex-1
flex
items-center
justify-center
gap-2
rounded-xl
bg-gray-100
py-3
font-semibold
"

>


<Edit size={16}/>

Edit


</Link>





<button

onClick={()=>deleteProduct(product._id)}

className="
rounded-xl
bg-red-500
px-4
text-white
"

>

<Trash2 size={18}/>


</button>



</div>








</div>


))

}



</div>









</div>

);

}









function StatCard({
title,
value,
icon:Icon
}:any){


return (

<div className="
rounded-3xl
bg-white
p-6
shadow-sm
border
">


<div className="
flex
justify-between
">


<div className="
rounded-xl
bg-black
p-3
text-white
">

<Icon size={22}/>

</div>


</div>



<p className="
mt-5
text-sm
text-gray-500
">

{title}

</p>



<h3 className="
text-3xl
font-black
">

{value}

</h3>



</div>

);

}








function Badge({
text
}:{
text:string
}){


return (

<span className="
rounded-full
bg-black
px-3
py-1
text-xs
text-white
">

{text}

</span>

);

}