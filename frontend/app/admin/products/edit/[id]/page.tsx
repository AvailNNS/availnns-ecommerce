"use client";

import {
  useEffect,
  useState,
} from "react";


import {
  useParams,
  useRouter,
} from "next/navigation";


import Image from "next/image";


import {
  Save,
  X,
  Upload,
  Loader2,
  Package,
  ImagePlus,
  Sparkles,
} from "lucide-react";


import {
  toast,
} from "sonner";



import {
  getProductById,
  updateProduct,
} from "@/services/product.service";


import {
  getAdminCategories,
} from "@/services/category.service";


import {
  Category,
} from "@/types/category";







export default function EditProductPage(){



const router =
useRouter();


const params =
useParams();


const id =
params.id as string;








const [loading,setLoading] =
useState(true);



const [saving,setSaving] =
useState(false);



const [error,setError] =
useState("");







const [categories,setCategories] =
useState<Category[]>([]);






const [oldImages,setOldImages] =
useState<any[]>([]);



const [newImages,setNewImages] =
useState<File[]>([]);



const [previewImages,setPreviewImages] =
useState<string[]>([]);








const [form,setForm] =
useState({

name:"",

description:"",

brand:"",

sku:"",

price:"",

discountPrice:"",

stock:"",

category:"",

tags:"",

isFeatured:false,

isBestSeller:false,

isNewArrival:false,

});











// ==========================
// DISCOUNT
// ==========================


const discountPercentage =

Number(form.price)>0 &&
Number(form.discountPrice)>0 &&
Number(form.discountPrice)<Number(form.price)

?


Math.round(

(
Number(form.price)
-
Number(form.discountPrice)

)

/

Number(form.price)

*100

)

:

0;












// ==========================
// LOAD PRODUCT
// ==========================


useEffect(()=>{


const loadProduct = async()=>{


try{


const res =
await getProductById(id);



const product =
res.product || res;





if(!product){


throw new Error(
"Product not found"
);


}







setForm({

name:
product.name || "",



description:
product.description || "",



brand:
product.brand || "",



sku:
product.sku || "",



price:
String(product.price || ""),



discountPrice:
String(product.discountPrice || ""),



stock:
String(product.stock || ""),



category:

typeof product.category === "object"

?

product.category._id

:

product.category || "",



tags:
product.tags?.join(", ") || "",



isFeatured:
product.isFeatured || false,



isBestSeller:
product.isBestSeller || false,



isNewArrival:
product.isNewArrival || false,


});






setOldImages(

product.images || []

);





}catch(err){


console.log(err);


setError(
"Failed to load product"
);



}finally{


setLoading(false);


}


};



loadProduct();



},[id]);












// ==========================
// LOAD CATEGORY
// ==========================


useEffect(()=>{


const loadCategories = async()=>{


try{


const token =
localStorage.getItem("token");



if(!token)
return;



const data =
await getAdminCategories(token);



setCategories(
data
);



}catch(error){


console.log(error);


}



};



loadCategories();



},[]);











// ==========================
// INPUT CHANGE
// ==========================


const handleChange =
(
e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
)=>{


const {
name,
value,
type
}=e.target;



setForm(prev=>({

...prev,


[name]:

type==="checkbox"

?

(e.target as HTMLInputElement).checked

:

value


}));


};











// ==========================
// IMAGE SELECT
// ==========================


const handleImages = (

e:React.ChangeEvent<HTMLInputElement>

)=>{


if(!e.target.files)
return;



const files =
Array.from(
e.target.files
);






const validFiles =
files.filter(file=>{


if(
!file.type.startsWith("image/")
){


toast.error(
"Only images allowed"
);


return false;

}




if(
file.size > 5*1024*1024
){


toast.error(
"Image must be under 5MB"
);


return false;


}



return true;



});







setNewImages(prev=>

[

...prev,

...validFiles

].slice(0,6)

);







const urls =
validFiles.map(file=>

URL.createObjectURL(file)

);



setPreviewImages(prev=>

[

...prev,

...urls

].slice(0,6)

);



};











// ==========================
// REMOVE OLD IMAGE
// ==========================


const removeOldImage =
(index:number)=>{


setOldImages(prev=>

prev.filter(
(_,i)=>i!==index
)

);


};











// ==========================
// REMOVE NEW IMAGE
// ==========================


const removeNewImage =
(index:number)=>{


setNewImages(prev=>

prev.filter(
(_,i)=>i!==index

)

);



setPreviewImages(prev=>

prev.filter(
(_,i)=>i!==index

)

);
};
// ==========================
// UPDATE PRODUCT
// ==========================

const handleSubmit = async(
e:React.FormEvent
)=>{

e.preventDefault();


try{


setSaving(true);
setError("");



const token =
localStorage.getItem("token");



if(!token){

setError("Unauthorized");
return;

}




if(
form.discountPrice &&
Number(form.discountPrice) >= Number(form.price)
){

setError(
"Discount price must be lower than regular price"
);

return;

}






const data =
new FormData();





Object.entries(form).forEach(
([key,value])=>{


if(key==="tags"){


const tags =
value
.toString()
.split(",")
.map(tag=>tag.trim())
.filter(Boolean);



data.append(
"tags",
JSON.stringify(tags)
);



}else{


data.append(
key,
String(value)
);


}


});







// existing images

data.append(
"oldImages",
JSON.stringify(oldImages)
);







// new images

newImages.forEach(file=>{


data.append(
"images",
file
);


});







await updateProduct(
id,
data,
token
);





toast.success(
"Product updated successfully"
);



router.push(
"/admin/products"
);






}catch(err:any){


console.log(
err
);



setError(

err.response?.data?.message ||

"Update failed"

);



}finally{


setSaving(false);


}



};

return (

<div className="
max-w-7xl
space-y-8
">


{/* HEADER */}

<div>

<div className="
flex
items-center
gap-3
">

<div className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-black
text-white
">

<Package size={24}/>

</div>


<div>

<h1 className="
text-3xl
font-black
">

Edit Product

</h1>


<p className="
text-gray-500
">

Update product information and inventory

</p>


</div>


</div>


</div>









{
error &&

<div className="
rounded-2xl
bg-red-100
p-4
text-red-600
font-medium
">

{error}

</div>

}









<form

onSubmit={handleSubmit}

className="
space-y-8
"

>









{/* BASIC INFORMATION */}


<section className="
rounded-3xl
border
bg-white
p-8
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
bg-zinc-100
p-3
">

<Package size={22}/>

</div>


<div>

<h2 className="
text-xl
font-bold
">

Basic Information

</h2>


<p className="
text-sm
text-gray-500
">

Product identity details

</p>


</div>


</div>








<div className="
grid
gap-5
md:grid-cols-2
">






<div>

<label className="
text-sm
font-semibold
">

Product Name

</label>


<input

name="name"

value={form.name}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
outline-none
focus:ring-2
focus:ring-black
"

placeholder="iPhone 15 Pro Max"

/>


</div>









<div>


<label className="
text-sm
font-semibold
">

Brand

</label>



<input

name="brand"

value={form.brand}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
"

placeholder="Apple"

/>


</div>









<div>


<label className="
text-sm
font-semibold
">

SKU

</label>


<input

name="sku"

value={form.sku}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
"

placeholder="APL-001"

/>


</div>









<div>


<label className="
text-sm
font-semibold
">

Category

</label>


<select

name="category"

value={form.category}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
"


>


<option value="">

Select category

</option>



{

categories.map(cat=>(


<option

key={cat._id}

value={cat._id}

>

{cat.name}

</option>


))


}


</select>


</div>





</div>


</section>













{/* DESCRIPTION */}


<section className="
rounded-3xl
border
bg-white
p-8
">


<h2 className="
mb-5
text-xl
font-bold
">

Description

</h2>


<textarea

name="description"

value={form.description}

onChange={handleChange}

rows={6}

className="
w-full
rounded-xl
border
p-4
"

placeholder="Write product details..."



/>


</section>













{/* PRICE + STOCK */}



<section className="
rounded-3xl
border
bg-white
p-8
">


<h2 className="
mb-6
text-xl
font-bold
">

Pricing & Inventory

</h2>




<div className="
grid
gap-5
md:grid-cols-3
">





<div>


<label className="
text-sm
font-semibold
">

Regular Price

</label>


<input

type="number"

name="price"

value={form.price}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
"

/>


</div>







<div>


<label className="
text-sm
font-semibold
">

Discount Price

</label>



<input

type="number"

name="discountPrice"

value={form.discountPrice}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
"

/>





{
discountPercentage>0 &&


<div className="
mt-2
flex
items-center
gap-2
text-sm
text-green-600
">


<Sparkles size={15}/>

Save {discountPercentage}%


</div>


}



</div>







<div>


<label className="
text-sm
font-semibold
">

Stock Quantity

</label>


<input

type="number"

name="stock"

value={form.stock}

onChange={handleChange}

className="
mt-2
w-full
rounded-xl
border
p-3
"

/>


</div>




</div>


</section>













{/* PRODUCT GALLERY */}



<section className="
rounded-3xl
border
bg-white
p-8
">


<div className="
mb-6
flex
items-center
justify-between
">


<div>

<h2 className="
text-xl
font-bold
">

Product Gallery

</h2>


<p className="
text-sm
text-gray-500
">

Maximum 6 images

</p>


</div>



<ImagePlus/>


</div>









<div className="
grid
grid-cols-2
gap-5
md:grid-cols-6
">



{


oldImages.map(

(img,index)=>(


<div

key={index}

className="
relative
group
overflow-hidden
rounded-xl
border
"


>


<Image

src={img.url}

alt="product"

width={200}

height={200}

className="
h-32
w-full
object-cover
"

/>



<button

type="button"

onClick={()=>removeOldImage(index)}

className="
absolute
right-2
top-2
rounded-full
bg-black
p-2
text-white
opacity-0
group-hover:opacity-100
transition
"

>


<X size={14}/>


</button>


</div>


)


)



}







{


previewImages.map(

(img,index)=>(


<div

key={img}

className="
relative
group
overflow-hidden
rounded-xl
border
"

>


<img

src={img}

className="
h-32
w-full
object-cover
"

/>



<button

type="button"

onClick={()=>removeNewImage(index)}

className="
absolute
right-2
top-2
rounded-full
bg-black
p-2
text-white
"

>


<X size={14}/>


</button>


</div>


)


)



}



</div>









<label className="
mt-6
flex
cursor-pointer
items-center
justify-center
gap-3
rounded-2xl
border-2
border-dashed
p-8
hover:bg-gray-50
transition
">


<Upload/>


Upload New Images


<input

type="file"

multiple

accept="image/*"

onChange={handleImages}

className="hidden"

/>


</label>




</section>
{/* SEO & TAGS */}

<section className="
rounded-3xl
border
bg-white
p-8
">


<h2 className="
mb-5
text-xl
font-bold
">

SEO & Tags

</h2>



<input

name="tags"

value={form.tags}

onChange={handleChange}

placeholder="
electronics, mobile, laptop
"

className="
w-full
rounded-xl
border
p-3
focus:ring-2
focus:ring-black
outline-none
"

/>



<p className="
mt-2
text-sm
text-gray-500
">

Separate tags with commas

</p>


</section>









{/* STATUS */}



<section className="
rounded-3xl
border
bg-white
p-8
">


<h2 className="
mb-6
text-xl
font-bold
">

Product Status

</h2>




<div className="
grid
gap-5
md:grid-cols-3
">





<label className="
flex
items-center
justify-between
rounded-2xl
border
p-4
cursor-pointer
hover:bg-gray-50
">


<div>


<p className="
font-semibold
">

Featured Product

</p>


<p className="
text-sm
text-gray-500
">

Show on homepage

</p>


</div>




<input

type="checkbox"

name="isFeatured"

checked={form.isFeatured}

onChange={handleChange}

/>



</label>









<label className="
flex
items-center
justify-between
rounded-2xl
border
p-4
cursor-pointer
hover:bg-gray-50
">


<div>


<p className="
font-semibold
">

Best Seller

</p>


<p className="
text-sm
text-gray-500
">

Popular product badge

</p>


</div>



<input

type="checkbox"

name="isBestSeller"

checked={form.isBestSeller}

onChange={handleChange}

/>


</label>









<label className="
flex
items-center
justify-between
rounded-2xl
border
p-4
cursor-pointer
hover:bg-gray-50
">


<div>


<p className="
font-semibold
">

New Arrival

</p>


<p className="
text-sm
text-gray-500
">

Latest collection

</p>


</div>



<input

type="checkbox"

name="isNewArrival"

checked={form.isNewArrival}

onChange={handleChange}

/>


</label>






</div>


</section>












{/* ACTION BUTTON */}



<div className="
sticky
bottom-5
rounded-3xl
border
bg-white
p-5
shadow-xl
">


<button

disabled={saving}

className="
flex
w-full
items-center
justify-center
gap-3
rounded-2xl
bg-black
py-4
text-white
font-bold
transition
hover:scale-[1.01]
disabled:opacity-50
"

>



{

saving

?

<>

<Loader2

size={20}

className="
animate-spin
"

/>

Updating Product...


</>


:

<>

<Save size={20}/>


Save Product Changes


</>


}



</button>


</div>









</form>


</div>
);
}