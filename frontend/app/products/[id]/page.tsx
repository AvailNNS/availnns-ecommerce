"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  notFound,
} from "next/navigation";


import {
  getProductById,
  getRelatedProducts,
  getNewArrivalProducts,
} from "@/services/product.service";


import {
  Product
} from "@/types/product";


import ProductGallery from "@/components/product/ProductGallery";

import ProductInfo from "@/components/product/ProductInfo";

import ProductSection from "@/components/product/ProductSection";





export default function ProductDetailsPage({

params,

}:{

params:{
id:string;
};

}){


const [product,setProduct] =
useState<Product | null>(null);


const [related,setRelated] =
useState<Product[]>([]);


const [recent,setRecent] =
useState<Product[]>([]);



const [loading,setLoading] =
useState(true);






useEffect(()=>{


const load = async()=>{


try{


setLoading(true);



const [

productRes,

relatedRes,

newRes

] = await Promise.all([


getProductById(
params.id
),


getRelatedProducts(
params.id
),


getNewArrivalProducts()


]);





const currentProduct =
productRes.product;



if(!currentProduct){

notFound();

return;

}





setProduct(
currentProduct
);




setRelated(
relatedRes || []
);





setRecent(

newRes
.filter(
(item:Product)=>
item._id !== params.id
)
.slice(0,4)

);





}catch(error){


console.log(
"Product details error",
error
);


}finally{


setLoading(false);


}


};



load();


},[
params.id
]);










if(loading){


return (

<div

className="
min-h-screen
flex
items-center
justify-center
"

>

<div

className="
animate-pulse
text-gray-500
"

>

Loading product...

</div>


</div>

);


}









if(!product){

return null;

}








return (

<main

className="
min-h-screen
bg-gray-50
py-10
"

>


<div

className="
mx-auto
max-w-7xl
px-6
"

>





{/* Breadcrumb */}


<div

className="
mb-8
text-sm
text-gray-500
"

>


Home

<span className="mx-2">
/
</span>


Shop

<span className="mx-2">
/
</span>


<span className="text-black">

{product.name}

</span>



</div>









{/* PRODUCT AREA */}



<section

className="
grid
gap-12
lg:grid-cols-2
"

>


<ProductGallery

product={product}

/>




<ProductInfo

product={product}

/>



</section>









{/* RELATED */}



{
related.length > 0 &&


<ProductSection

title="Related Products"

products={related}

/>


}









{
recent.length > 0 &&


<ProductSection

title="New Arrivals"

products={recent}

/>


}




</div>


</main>


);


}