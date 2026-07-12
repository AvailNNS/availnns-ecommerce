"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  SlidersHorizontal,
  Filter,
} from "lucide-react";


import {
  getProducts
} from "@/services/product.service";


import {
  Product
} from "@/types/product";


import ProductCard from "@/components/product/ProductCard";

import ShopSidebar from "@/components/shop/ShopSidebar";



export default function ShopPage(){


const [products,setProducts]=useState<Product[]>([]);

const [loading,setLoading]=useState(true);

const [sort,setSort]=useState("default");

const [filterOpen,setFilterOpen]=useState(false);



// FILTER STATES

const [category,setCategory]=useState("all");

const [minPrice,setMinPrice]=useState("");

const [maxPrice,setMaxPrice]=useState("");

const [rating,setRating]=useState(0);

const [stockOnly,setStockOnly]=useState(false);







useEffect(()=>{


const fetchProducts=async()=>{


try{


const data =
await getProducts();


setProducts(data || []);



}catch(error){


console.log(error);


}finally{


setLoading(false);


}


};


fetchProducts();


},[]);









const clearFilter=()=>{

setCategory("all");

setMinPrice("");

setMaxPrice("");

setRating(0);

setStockOnly(false);

};









const filteredProducts =
products.filter((product)=>{


const categoryMatch =
category==="all"
||
(
typeof product.category==="object"
&&
product.category.name===category
);



const priceMatch =
(!minPrice ||
product.price >= Number(minPrice))
&&
(!maxPrice ||
product.price <= Number(maxPrice));




const ratingMatch =
!rating
||
(product.rating || 0)>=rating;



const stockMatch =
!stockOnly
||
product.stock>0;




return (

categoryMatch
&&
priceMatch
&&
ratingMatch
&&
stockMatch

);


});









const sortedProducts =
[...filteredProducts].sort((a,b)=>{


if(sort==="low"){

return a.price-b.price;

}


if(sort==="high"){

return b.price-a.price;

}


if(sort==="rating"){

return (
(b.rating || 0)
-
(a.rating || 0)
);

}


return 0;


});









return (

<main className="
min-h-screen
bg-gray-50
py-10
">


<div className="
mx-auto
max-w-7xl
px-6
">







{/* HEADER */}


<div className="
mb-8
flex
flex-col
gap-5
md:flex-row
md:items-center
md:justify-between
">


<div>


<h1 className="
text-4xl
font-bold
">

Shop Products

</h1>


<p className="
mt-2
text-gray-500
">

{sortedProducts.length}
Products Found

</p>


</div>







<div className="
flex
gap-3
">



<button

onClick={()=>setFilterOpen(true)}

className="
flex
items-center
gap-2
rounded-xl
bg-black
px-5
py-3
text-white
lg:hidden
"

>

<Filter size={18}/>

Filter

</button>








<div className="
flex
items-center
gap-3
rounded-xl
bg-white
px-4
py-3
shadow
">


<SlidersHorizontal size={18}/>



<select

value={sort}

onChange={(e)=>
setSort(e.target.value)
}

className="
outline-none
text-sm
"

>


<option value="default">

Sort By

</option>


<option value="low">

Price Low To High

</option>


<option value="high">

Price High To Low

</option>


<option value="rating">

Top Rated

</option>


</select>


</div>



</div>


</div>









{/* MAIN */}

<div className="
grid
gap-8
lg:grid-cols-4
">









{/* DESKTOP SIDEBAR */}


<div className="
hidden
lg:block
">


<ShopSidebar

open={false}

onClose={()=>{}}

category={category}

setCategory={setCategory}

minPrice={minPrice}

setMinPrice={setMinPrice}

maxPrice={maxPrice}

setMaxPrice={setMaxPrice}

rating={rating}

setRating={setRating}

stockOnly={stockOnly}

setStockOnly={setStockOnly}

clearFilter={clearFilter}

/>


</div>









{/* PRODUCTS */}


<div className="
lg:col-span-3
">







{

loading &&

<div className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
xl:grid-cols-4
">


{

Array.from({
length:8
}).map((_,i)=>(


<div

key={i}

className="
h-96
rounded-3xl
bg-white
animate-pulse
"

/>


))

}


</div>

}









{

!loading &&
sortedProducts.length===0 &&


<div className="
rounded-3xl
bg-white
p-10
text-center
"

>

<h2 className="
text-xl
font-bold
">

No products found

</h2>



<button

onClick={clearFilter}

className="
mt-5
rounded-full
bg-black
px-6
py-3
text-white
"

>

Clear Filter

</button>


</div>


}









{

!loading &&
sortedProducts.length>0 &&


<div className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
xl:grid-cols-4
">


{

sortedProducts.map(product=>(


<ProductCard

key={product._id}

product={product}

/>


))


}


</div>


}





</div>







</div>









{/* MOBILE ONLY SIDEBAR */}


<div className="lg:hidden">


<ShopSidebar

open={filterOpen}

onClose={()=>setFilterOpen(false)}

category={category}

setCategory={setCategory}

minPrice={minPrice}

setMinPrice={setMinPrice}

maxPrice={maxPrice}

setMaxPrice={setMaxPrice}

rating={rating}

setRating={setRating}

stockOnly={stockOnly}

setStockOnly={setStockOnly}

clearFilter={clearFilter}

/>


</div>







</div>

</main>

);


}