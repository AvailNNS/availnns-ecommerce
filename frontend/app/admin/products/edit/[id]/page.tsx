"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  updateProduct,
  getAdminProducts,
} from "@/services/product.service";

import {
  getAdminCategories,
} from "@/services/category.service";


type ProductImage = {
  url:string;
  public_id:string;
};


type Category = {
  _id:string;
  name:string;
};



export default function EditProductPage(){

  const router = useRouter();

  const params = useParams();

  const id = params.id as string;



  const [categories,setCategories] =
    useState<Category[]>([]);



  const [form,setForm] = useState({

    name:"",
    description:"",
    price:"",
    images:[] as ProductImage[],
    newImages:[] as File[],
    category:"",
    stock:"",
    isFeatured:false,
    isBestSeller:false,

  });



  const [preview,setPreview] =
    useState<string[]>([]);



  const [loading,setLoading] =
    useState(true);


  const [saving,setSaving] =
    useState(false);


  const [error,setError] =
    useState("");





  useEffect(()=>{


    const loadData = async()=>{


      try{


        const token =
          localStorage.getItem("token");


        if(!token) return;



        const products =
          await getAdminProducts(token);



        const product =
          products.find(
            (p:any)=>p._id===id
          );



        const cats =
          await getAdminCategories(token);


        setCategories(cats);



        if(product){


          setForm({

            name:product.name || "",

            description:
              product.description || "",


            price:
              String(product.price),


            images:
              product.images || [],


            newImages:[],


            category:
              typeof product.category==="object"
              ? product.category._id
              : product.category,


            stock:
              String(product.stock),


            isFeatured:
              product.isFeatured,


            isBestSeller:
              product.isBestSeller,

          });


        }


      }catch(err){

        console.log(err);

        setError("Failed loading product");


      }finally{

        setLoading(false);

      }


    };


    loadData();


  },[id]);







  const handleChange=(e:any)=>{


    const {
      name,
      value,
      type,
      checked
    }=e.target;



    setForm(prev=>({

      ...prev,

      [name]:
        type==="checkbox"
        ? checked
        : value

    }));

  };








  // remove old cloudinary image

  const removeOldImage=(public_id:string)=>{


    setForm(prev=>({

      ...prev,

      images:
      prev.images.filter(
        img=>img.public_id!==public_id
      )

    }));


  };








  // new image upload


  const handleFileChange=(
    e:React.ChangeEvent<HTMLInputElement>
  )=>{


    if(!e.target.files)
      return;


    const files =
      Array.from(e.target.files);



    setForm(prev=>({

      ...prev,

      newImages:[
        ...prev.newImages,
        ...files
      ]

    }));



    const urls =
      files.map(file=>
        URL.createObjectURL(file)
      );


    setPreview(prev=>[
      ...prev,
      ...urls
    ]);



  };








  const removeNewImage=(index:number)=>{


    setForm(prev=>({

      ...prev,

      newImages:
      prev.newImages.filter(
        (_,i)=>i!==index
      )

    }));


    setPreview(prev=>
      prev.filter(
        (_,i)=>i!==index
      )
    );


  };









  const handleSubmit=async(
    e:React.FormEvent
  )=>{


    e.preventDefault();



    try{


      setSaving(true);



      const token =
        localStorage.getItem("token");



      if(!token)
        return;



      const data =
        new FormData();



      data.append(
        "name",
        form.name
      );


      data.append(
        "description",
        form.description
      );


      data.append(
        "price",
        form.price
      );


      data.append(
        "category",
        form.category
      );


      data.append(
        "stock",
        form.stock
      );


      data.append(
        "isFeatured",
        String(form.isFeatured)
      );


      data.append(
        "isBestSeller",
        String(form.isBestSeller)
      );



      // keep old images

      data.append(
        "oldImages",
        JSON.stringify(form.images)
      );



      // new images

      form.newImages.forEach(file=>{

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



    }catch(err){

      console.log(err);

      setError(
        "Update failed"
      );


    }finally{

      setSaving(false);

    }


  };







  if(loading)
  return (
    <div className="p-8">
      Loading...
    </div>
  );






return (

<div className="max-w-3xl">


<h1 className="text-3xl font-bold mb-6">
Edit Product
</h1>



<form
onSubmit={handleSubmit}
className="bg-white shadow rounded-2xl p-8 space-y-5"
>



{error &&

<div className="bg-red-100 text-red-600 p-3 rounded">
{error}
</div>

}






<input
name="name"
value={form.name}
onChange={handleChange}
className="w-full border p-3 rounded"
placeholder="Name"
/>





<textarea

name="description"

value={form.description}

onChange={handleChange}

className="w-full border p-3 rounded"

rows={5}

/>







{/* OLD IMAGES */}

<div>

<h3 className="font-semibold mb-3">
Current Images
</h3>


<div className="grid grid-cols-3 gap-4">


{
form.images.map(img=>(


<div
key={img.public_id}
className="border rounded overflow-hidden"
>


<img
src={img.url}
className="h-32 w-full object-cover"
/>


<button

type="button"

onClick={()=>
removeOldImage(img.public_id)
}

className="w-full bg-red-600 text-white py-2"

>

Remove

</button>


</div>


))

}


</div>


</div>








{/* NEW IMAGE */}


<input

type="file"

multiple

accept="image/*"

onChange={handleFileChange}

/>





<div className="grid grid-cols-3 gap-4">


{
preview.map((img,index)=>(


<div key={index}>


<img
src={img}
className="h-32 w-full object-cover rounded"
/>


<button

type="button"

onClick={()=>
removeNewImage(index)
}

className="text-red-600"

>

Remove

</button>


</div>


))

}


</div>








<select

name="category"

value={form.category}

onChange={handleChange}

className="w-full border p-3 rounded"

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








<div className="grid grid-cols-2 gap-4">


<input

name="price"

type="number"

value={form.price}

onChange={handleChange}

className="border p-3 rounded"

/>


<input

name="stock"

type="number"

value={form.stock}

onChange={handleChange}

className="border p-3 rounded"

/>


</div>








<label>

<input

type="checkbox"

name="isFeatured"

checked={form.isFeatured}

onChange={handleChange}

/>

 Featured

</label>





<label>

<input

type="checkbox"

name="isBestSeller"

checked={form.isBestSeller}

onChange={handleChange}

/>

 Best Seller

</label>








<button

disabled={saving}

className="w-full bg-black text-white py-3 rounded-xl"

>

{
saving
?"Updating..."
:"Update Product"
}


</button>



</form>


</div>

);


}