"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


import {
  Upload,
  X,
  Save,
} from "lucide-react";


import {
  createProduct,
} from "@/services/product.service";


import {
  getAdminCategories,
} from "@/services/category.service";


import {
  Category,
} from "@/types/category";




export default function AddProductPage(){


const router = useRouter();




const [loading,setLoading] =
useState(false);


const [error,setError] =
useState("");



const [categories,setCategories] =
useState<Category[]>([]);



const [images,setImages] =
useState<File[]>([]);



const [previews,setPreviews] =
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

isNewArrival:true,

});








// Discount Preview

const discountPercentage =

Number(form.price) > 0 &&
Number(form.discountPrice) > 0 &&
Number(form.discountPrice) < Number(form.price)

?

Math.round(

(
Number(form.price)
-
Number(form.discountPrice)

)

/

Number(form.price)

*

100

)

:

0;









// Load Categories


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









// Image Preview


useEffect(()=>{


const urls =
images.map(file=>

URL.createObjectURL(file)

);



setPreviews(urls);




return()=>{


urls.forEach(url=>

URL.revokeObjectURL(url)

);


};



},[images]);









// Input Change


const handleChange =

(
e:
React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>

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











// Image Upload


const handleImages =

(
e:
React.ChangeEvent<HTMLInputElement>

)=>{


if(!e.target.files)
return;




const files =
Array.from(e.target.files);



setImages(prev=>[

...prev,

...files

]);



};









// Remove Image


const removeImage =

(index:number)=>{


setImages(prev=>

prev.filter(
(_,i)=>i!==index

)

);


};









// Submit


const handleSubmit = async(

e:React.FormEvent

)=>{


e.preventDefault();



try{


setLoading(true);

setError("");



const token =
localStorage.getItem("token");



if(!token){

setError(
"Unauthorized"
);

return;

}






if(
Number(form.discountPrice)
>=
Number(form.price)

&&
Number(form.discountPrice)>0

){

setError(
"Discount price must be lower than regular price"
);


return;

}







if(images.length===0){


setError(
"Please upload product images"
);


return;


}







const data =
new FormData();








Object.entries(form)
.forEach(([key,value])=>{



if(key==="tags"){



const tags =

typeof value==="string"

?

value
.split(",")
.map(tag=>tag.trim())
.filter(Boolean)

:

[];





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








images.forEach(file=>{


data.append(

"images",

file

);


});







await createProduct(

data,

token

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

"Product create failed"

);



}finally{


setLoading(false);


}


};

return (

<div className="max-w-6xl space-y-8">


<div>

<h1 className="
text-3xl
font-bold
">

Add New Product

</h1>


<p className="
mt-2
text-gray-500
">

Create professional product listing

</p>


</div>







<form

onSubmit={handleSubmit}

className="
space-y-8
rounded-3xl
bg-white
p-8
shadow-xl
"

>





{
error &&

<div

className="
rounded-xl
bg-red-100
p-4
text-red-600
"

>

{error}

</div>

}








{/* PRODUCT INFO */}


<section>


<h2 className="
mb-5
text-xl
font-bold
">

Product Information

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

placeholder="Product Name"

className="
rounded-xl
border
p-3
"

required

/>






<input

name="brand"

value={form.brand}

onChange={handleChange}

placeholder="Brand Name"

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

required

>


<option value="">

Select Category

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

placeholder="Product description"

className="
w-full
rounded-xl
border
p-4
"

required

/>



</section>








{/* PRICE */}


<section>


<h2 className="
mb-5
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

placeholder="100"

className="
mt-2
w-full
rounded-xl
border
p-3
"

required

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

placeholder="80"

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


<p className="
mt-2
text-sm
text-green-600
">

Save {discountPercentage}%


</p>


}



</div>









<div>


<label className="
text-sm
font-semibold
">

Stock

</label>



<input

type="number"

name="stock"

value={form.stock}

onChange={handleChange}

placeholder="50"

className="
mt-2
w-full
rounded-xl
border
p-3
"

required

/>



</div>



</div>


</section>









{/* IMAGE */}


<section>


<h2 className="
mb-5
text-xl
font-bold
">

Product Gallery

</h2>




<label

className="
flex
cursor-pointer
items-center
justify-center
gap-3
rounded-2xl
border-2
border-dashed
p-10
hover:bg-gray-50
"

>


<Upload size={28}/>


Upload Images



<input

type="file"

multiple

accept="image/*"

onChange={handleImages}

className="hidden"

/>


</label>









{

previews.length>0 &&


<div className="
mt-6
grid
grid-cols-2
gap-5
md:grid-cols-4
">


{

previews.map((img,index)=>(


<div

key={img}

className="
group
relative
overflow-hidden
rounded-xl
border
"

>


<img

src={img}

alt="preview"

className="
h-36
w-full
object-cover
"

/>



<button

type="button"

onClick={()=>removeImage(index)}

className="
absolute
right-2
top-2
rounded-full
bg-black
p-2
text-white
opacity-0
transition
group-hover:opacity-100
"

>


<X size={16}/>


</button>



</div>


))

}


</div>


}




</section>









{/* TAGS */}


<section>


<h2 className="
mb-5
text-xl
font-bold
">

Tags

</h2>



<input

name="tags"

value={form.tags}

onChange={handleChange}

placeholder="
electronics, phone, laptop
"

className="
w-full
rounded-xl
border
p-3
"

/>



</section>








{/* STATUS */}


<section>


<h2 className="
mb-5
text-xl
font-bold
">

Status

</h2>




<div className="
flex
flex-wrap
gap-8
">


<label className="
flex
items-center
gap-3
">


<input

type="checkbox"

name="isFeatured"

checked={form.isFeatured}

onChange={handleChange}

/>


⭐ Featured


</label>







<label className="
flex
items-center
gap-3
">


<input

type="checkbox"

name="isBestSeller"

checked={form.isBestSeller}

onChange={handleChange}

/>


🔥 Best Seller


</label>







<label className="
flex
items-center
gap-3
">


<input

type="checkbox"

name="isNewArrival"

checked={form.isNewArrival}

onChange={handleChange}

/>


✨ New Arrival


</label>



</div>


</section>









<button

disabled={loading}

className="
flex
w-full
items-center
justify-center
gap-3
rounded-2xl
bg-black
py-4
font-bold
text-white
transition
hover:scale-[1.01]
disabled:opacity-50
"

>


<Save size={18}/>



{

loading

?

"Creating Product..."

:

"Create Product"

}


</button>







</form>


</div>


);
}