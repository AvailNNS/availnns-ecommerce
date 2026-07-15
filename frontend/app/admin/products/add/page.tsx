"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import Image from "next/image";


import {
  Upload,
  X,
  Save,
  Sparkles,
  Package,
} from "lucide-react";


import {
  toast,
} from "sonner";


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


const router =
useRouter();




const [loading,setLoading] =
useState(false);



const [error,setError] =
useState("");



const [categories,setCategories] =
useState<Category[]>([]);



const [categoryLoading,setCategoryLoading] =
useState(true);



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










// ======================
// DISCOUNT
// ======================


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










// ======================
// LOAD CATEGORY
// ======================


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



}catch(err){


console.log(err);


}finally{


setCategoryLoading(false);


}


};



loadCategories();


},[]);











// ======================
// IMAGE PREVIEW
// ======================


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












// ======================
// CHANGE
// ======================


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












// ======================
// IMAGE UPLOAD
// ======================


const handleImages = (

e:
React.ChangeEvent<HTMLInputElement>

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
"Only image files allowed"
);

return false;

}





if(
file.size > 5*1024*1024
){

toast.error(
`${file.name} exceeds 5MB`
);


return false;

}



return true;


});






setImages(prev=>

[

...prev,

...validFiles

].slice(0,6)

);



};









// ======================
// REMOVE IMAGE
// ======================


const removeImage =
(index:number)=>{


setImages(prev=>

prev.filter(
(_,i)=>i!==index
)

);


};

// ======================
// SUBMIT
// ======================


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
form.discountPrice &&
Number(form.discountPrice)
>=
Number(form.price)
){


setError(
"Discount price must be lower than price"
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





toast.success(
"Product created successfully"
);



router.push(
"/admin/products"
);





}catch(err:any){


console.log(err);



setError(

err.response?.data?.message ||

"Product create failed"

);



}finally{


setLoading(false);


}



};









return (

<div

className="
mx-auto
max-w-6xl
space-y-8
"

>







<div>


<h1

className="
text-3xl
font-black
"

>

Add New Product

</h1>


<p

className="
mt-2
text-gray-500
"

>

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
font-medium
text-red-600
"

>

{error}

</div>

}










{/* PRODUCT INFO */}



<section>


<div

className="
mb-5
flex
items-center
gap-2
"

>

<Package size={22}/>


<h2

className="
text-xl
font-bold
"

>

Product Information

</h2>


</div>






<div

className="
grid
gap-5
md:grid-cols-2
"

>



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

required

>



<option value="">

Select Category

</option>






{

categoryLoading

?

<option>
Loading...
</option>


:

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


<h2

className="
mb-5
text-xl
font-bold
"

>

Description

</h2>



<textarea


name="description"

value={form.description}

onChange={handleChange}

rows={6}

placeholder="Product description..."

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


<h2

className="
mb-5
text-xl
font-bold
"

>

Pricing & Inventory

</h2>





<div

className="
grid
gap-5
md:grid-cols-3
"

>





<div>


<label className="text-sm font-semibold">

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

placeholder="100"

required

/>


</div>







<div>


<label className="text-sm font-semibold">

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

placeholder="80"

/>






{

discountPercentage>0 &&


<p

className="
mt-2
text-sm
font-semibold
text-green-600
"

>

Save {discountPercentage}%


</p>


}



</div>







<div>


<label className="text-sm font-semibold">

Stock

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

placeholder="50"

required

/>





</div>





</div>



</section>
{/* IMAGE GALLERY */}


<section>


<h2

className="
mb-5
text-xl
font-bold
"

>

Product Gallery

</h2>





<label

className="
flex
cursor-pointer
flex-col
items-center
justify-center
gap-3
rounded-3xl
border-2
border-dashed
p-10
transition
hover:bg-gray-50
"

>


<Upload size={32}/>


<p

className="
font-semibold
"

>

Upload Product Images

</p>


<p

className="
text-sm
text-gray-500
"

>

Maximum 6 images • 5MB each

</p>





<input

type="file"

multiple

accept="image/*"

onChange={handleImages}

className="
hidden
"

/>



</label>









{/* PREVIEW */}



{

previews.length>0 &&


<div

className="
mt-6
grid
grid-cols-2
gap-5
md:grid-cols-3
lg:grid-cols-6
"

>


{

previews.map((img,index)=>(


<div

key={img}

className="
group
relative
overflow-hidden
rounded-2xl
border
bg-gray-100
"

>


<Image

src={img}

alt="preview"

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


<h2

className="
mb-5
text-xl
font-bold
"

>

Tags

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
"

/>


<p

className="
mt-2
text-sm
text-gray-500
"

>

Separate tags using comma

</p>



</section>















{/* STATUS */}



<section>


<h2

className="
mb-5
text-xl
font-bold
"

>

Product Status

</h2>







<div

className="
grid
gap-4
md:grid-cols-3
"

>








<label

className="
flex
cursor-pointer
items-center
gap-3
rounded-xl
border
p-4
hover:bg-gray-50
"

>


<input

type="checkbox"

name="isFeatured"

checked={form.isFeatured}

onChange={handleChange}

/>


<span>

⭐ Featured

</span>


</label>









<label

className="
flex
cursor-pointer
items-center
gap-3
rounded-xl
border
p-4
hover:bg-gray-50
"

>


<input

type="checkbox"

name="isBestSeller"

checked={form.isBestSeller}

onChange={handleChange}

/>


<span>

🔥 Best Seller

</span>


</label>









<label

className="
flex
cursor-pointer
items-center
gap-3
rounded-xl
border
p-4
hover:bg-gray-50
"

>


<input

type="checkbox"

name="isNewArrival"

checked={form.isNewArrival}

onChange={handleChange}

/>


<span>

✨ New Arrival

</span>


</label>






</div>




</section>















{/* SUBMIT */}



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