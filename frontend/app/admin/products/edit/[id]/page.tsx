"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  ImagePlus,
  X,
  Save,
  Package,
  Loader2,
} from "lucide-react";


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


const router = useRouter();

const params = useParams();

const id = params.id as string;




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



const [preview,setPreview] =
useState<string[]>([]);






const [form,setForm] =
useState<any>({

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

});









// =========================
// LOAD PRODUCT
// =========================


useEffect(()=>{


const loadProduct = async()=>{


try{


const res =
await getProductById(id);



const product =
res.products?.[0] ||
res.product;



if(!product){

setError(
"Product not found"
);

return;

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
product.price || "",


discountPrice:
product.discountPrice || "",


stock:
product.stock || "",


category:
typeof product.category === "object"
?
product.category._id
:
product.category,


tags:
product.tags?.join(",") || "",


isFeatured:
product.isFeatured || false,


isBestSeller:
product.isBestSeller || false,


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










// =========================
// LOAD CATEGORIES
// =========================


useEffect(()=>{


const loadCategories = async()=>{


try{


const token =
localStorage.getItem("token");


if(!token)
return;



const data =
await getAdminCategories(token);


setCategories(data);



}catch(err){


console.log(err);


}


};



loadCategories();



},[]);









// =========================
// INPUT CHANGE
// =========================


const handleChange =
(
e:any
)=>{


const {
name,
value,
type,
checked
}=e.target;



setForm((prev:any)=>({

...prev,


[name]:

type==="checkbox"

?
checked

:
value


}));



};









// =========================
// NEW IMAGE SELECT
// =========================


const handleImages =
(
e:React.ChangeEvent<HTMLInputElement>
)=>{


if(!e.target.files)
return;



const files =
Array.from(e.target.files);



setNewImages(files);



setPreview(

files.map(file=>

URL.createObjectURL(file)

)

);



};









// =========================
// REMOVE OLD IMAGE
// =========================


const removeOldImage =
(index:number)=>{


setOldImages(prev=>

prev.filter(
(_,i)=>i!==index
)

);


};









// =========================
// REMOVE NEW IMAGE
// =========================


const removeNewImage =
(index:number)=>{


setNewImages(prev=>

prev.filter(
(_,i)=>i!==index

)

);



setPreview(prev=>

prev.filter(
(_,i)=>i!==index

)

);



};
 
// =========================
// SUBMIT UPDATE
// =========================


const handleSubmit =
async(
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




const data =
new FormData();





Object.entries(form).forEach(
([key,value])=>{


data.append(
key,
String(value)
);


});





data.append(
"oldImages",
JSON.stringify(oldImages)
);





newImages.forEach(
(file)=>{


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





router.push(
"/admin/products"
);





}catch(err:any){


console.log(
"UPDATE ERROR:",
err.response?.data
);



setError(

err.response?.data?.message ||

"Update failed"

);



}finally{


setSaving(false);


}


};









if(loading){


return (

<div className="
flex
h-96
items-center
justify-center
gap-3
">

<Loader2
className="animate-spin"
/>

Loading Product...


</div>

);


}







return (

<div className="
max-w-6xl
space-y-8
">


<div>


<h1 className="
text-3xl
font-bold
">

Edit Product

</h1>


<p className="
text-gray-500
">

Update your product details

</p>


</div>







<form

onSubmit={handleSubmit}

className="
rounded-3xl
bg-white
p-8
shadow-xl
space-y-8
"

>





{
error &&

<div className="
rounded-xl
bg-red-100
p-4
text-red-600
">

{error}

</div>

}







{/* BASIC INFO */}


<section>


<h2 className="
mb-4
text-xl
font-bold
">

Basic Information

</h2>



<div className="
grid
gap-5
md:grid-cols-2
">


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Product name"

className="
rounded-xl
border
p-3
"

/>





<input

name="brand"

value={form.brand}

onChange={handleChange}

placeholder="Brand"

className="
rounded-xl
border
p-3
"

/>





<input

name="sku"

value={form.sku}

onChange={handleChange}

placeholder="SKU"

className="
rounded-xl
border
p-3
"

/>






<select

name="category"

value={form.category}

onChange={handleChange}

className="
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


</section>









{/* DESCRIPTION */}


<section>


<h2 className="
mb-4
text-xl
font-bold
">

Description

</h2>



<textarea

name="description"

value={form.description}

onChange={handleChange}

rows={5}

className="
w-full
rounded-xl
border
p-4
"

placeholder="Product description"

/>


</section>









{/* PRICE */}


<section>


<h2 className="
mb-4
text-xl
font-bold
">

Pricing & Stock

</h2>



<div className="
grid
gap-5
md:grid-cols-3
">



<input

type="number"

name="price"

value={form.price}

onChange={handleChange}

placeholder="Regular price"

className="
rounded-xl
border
p-3
"

/>





<input

type="number"

name="discountPrice"

value={form.discountPrice}

onChange={handleChange}

placeholder="Discount price"

className="
rounded-xl
border
p-3
"

/>





<input

type="number"

name="stock"

value={form.stock}

onChange={handleChange}

placeholder="Stock"

className="
rounded-xl
border
p-3
"

/>


</div>



</section>









{/* IMAGES */}


<section>


<h2 className="
mb-4
text-xl
font-bold
">

Product Images

</h2>



<div className="
grid
grid-cols-2
gap-4
md:grid-cols-5
">


{
oldImages.map(
(img,index)=>(


<div

key={index}

className="
relative
overflow-hidden
rounded-xl
border
"

>


<img

src={img.url}

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
p-1
text-white
"

>

<X size={14}/>

</button>



</div>


))


}






{
preview.map(
(img,index)=>(


<div

key={index}

className="
relative
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
p-1
text-white
"

>

<X size={14}/>

</button>



</div>



))


}


</div>







<label className="
mt-5
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
">


<ImagePlus/>

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









{/* OPTIONS */}


<section className="
flex
gap-8
flex-wrap
">


<label className="
flex
items-center
gap-2
">


<input

type="checkbox"

name="isFeatured"

checked={form.isFeatured}

onChange={handleChange}

/>


Featured


</label>






<label className="
flex
items-center
gap-2
">


<input

type="checkbox"

name="isBestSeller"

checked={form.isBestSeller}

onChange={handleChange}

/>


Best Seller


</label>


</section>









<button

disabled={saving}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-2xl
bg-black
py-4
font-bold
text-white
transition
hover:opacity-90
disabled:opacity-50
"

>


{

saving

?

<>

<Loader2
size={18}
className="animate-spin"
/>

Updating...

</>


:

<>

<Save size={18}/>

Save Changes

</>


}



</button>





</form>


</div>


);

}