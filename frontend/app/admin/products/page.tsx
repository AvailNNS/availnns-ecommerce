"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  Edit,
  Trash2,
  Plus,
  Package,
  Star,
  TrendingUp,
} from "lucide-react";


import {
  getAdminProducts,
  removeProduct,
} from "@/services/product.service";


import {
  Product,
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


}finally{

setLoading(false);

}


};





useEffect(()=>{

loadProducts();

},[]);









const deleteProduct =
async(id:string)=>{


const confirmDelete =
confirm(
"Are you sure you want to delete?"
);



if(!confirmDelete)
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



}catch(error){

console.log(error);

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

return(

<div className="p-10 text-center">

Loading products...

</div>

);

}






return(

<div className="space-y-8">





{/* HEADER */}


<div className="
flex
items-center
justify-between
">


<div>

<h1 className="
text-3xl
font-bold
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
gap-2
rounded-xl
bg-black
px-5
py-3
text-white
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
md:grid-cols-3
">



<div className="
rounded-2xl
bg-white
p-5
shadow
">

<div className="flex gap-3 items-center">

<Package/>

<h3>
Total Products
</h3>

</div>


<p className="
mt-3
text-3xl
font-bold
">

{products.length}

</p>


</div>





<div className="
rounded-2xl
bg-white
p-5
shadow
">


<div className="flex gap-3 items-center">

<TrendingUp/>

<h3>
Best Sellers
</h3>


</div>


<p className="
mt-3
text-3xl
font-bold
">

{
products.filter(
p=>p.isBestSeller
).length
}

</p>



</div>







<div className="
rounded-2xl
bg-white
p-5
shadow
">


<div className="flex gap-3 items-center">

<Star/>

<h3>
Featured
</h3>

</div>


<p className="
mt-3
text-3xl
font-bold
">

{
products.filter(
p=>p.isFeatured
).length
}

</p>


</div>



</div>










{/* SEARCH */}


<div className="
relative
max-w-lg
">


<Search

className="
absolute
left-3
top-3
text-gray-400
"

/>



<input

placeholder="
Search products...
"

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="
w-full
rounded-xl
border
py-3
pl-10
pr-4
"

/>


</div>









{/* PRODUCTS */}


{

filteredProducts.length===0 ?


<div className="
rounded-3xl
bg-white
p-12
text-center
shadow
">


<Package
size={50}
className="mx-auto mb-4"
/>


<h2 className="
text-xl
font-bold
">

No products found

</h2>



</div>



:



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
rounded-3xl
bg-white
p-5
shadow
transition
hover:-translate-y-1
hover:shadow-xl
"

>


<div className="
relative
h-56
overflow-hidden
rounded-2xl
bg-gray-100
">


<img

src={
product.images?.[0]?.url ||
"/placeholder.png"
}

className="
h-full
w-full
object-cover
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

Sale

</span>

}



</div>








<h2 className="
mt-4
truncate
text-xl
font-bold
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
gap-3
">


<span className="
text-xl
font-bold
">

${product.price}

</span>


{
product.discountPrice>0 &&

<span className="
text-gray-400
line-through
">

${product.discountPrice}

</span>

}



</div>









<div className="
mt-4
flex
gap-2
flex-wrap
">


{
product.isFeatured &&

<span className="
rounded-full
bg-blue-100
px-3
py-1
text-xs
">

Featured

</span>

}



{
product.isBestSeller &&

<span className="
rounded-full
bg-yellow-100
px-3
py-1
text-xs
">

Best Seller

</span>

}



</div>







<p className="
mt-4
font-medium
">

Stock:

<span className="
text-green-600
ml-2
">

{product.stock}

</span>


</p>








<div className="
mt-5
flex
gap-3
">


<Link

href={`/admin/products/edit/${product._id}`}

className="
flex-1
flex
justify-center
items-center
gap-2
rounded-xl
bg-gray-100
py-3
"

>


<Edit size={16}/>

Edit


</Link>





<button

onClick={()=>
deleteProduct(product._id)
}

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


}



</div>


);


}