"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  getCategoryTree
} from "@/services/category.service";


type Category = {

  _id:string;
  name:string;
  slug:string;
  children?:Category[];

};



export default function CategoryGrid(){


const [categories,setCategories] = useState<Category[]>([]);

const [openId,setOpenId] = useState<string | null>(null);



useEffect(()=>{


const load = async()=>{

try{

const data = await getCategoryTree();

console.log(data);

setCategories(data);

}
catch(error){

console.log(error);

}

};


load();


},[]);





return (

<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
">


{
categories.map((category)=>(


<div

key={category._id}

className="
rounded-2xl
border
bg-white
p-5
shadow-sm
"

>


<div

className="
flex
items-center
justify-between
"

>


<Link

href={`/category/${category.slug}`}

className="
text-xl
font-bold
"

>

{category.name}

</Link>



{

category.children &&
category.children.length > 0
&&


<button

type="button"

onClick={()=>{

setOpenId(
openId===category._id
?
null
:
category._id
)

}}

className="
rounded-full
p-2
hover:bg-gray-100
"

>

<ChevronDown

size={20}

className={`
transition

${
openId===category._id
?
"rotate-180"
:
""
}

`}

/>


</button>


}


</div>





{

openId===category._id &&

category.children &&

<div

className="
mt-5
border-t
pt-4
space-y-3
"

>


{

category.children.map((sub)=>(


<Link

key={sub._id}

href={`/category/${sub.slug}`}

className="
block
rounded-lg
px-3
py-2
text-sm
text-gray-600
hover:bg-gray-100
hover:text-black
"

>

{sub.name}

</Link>


))


}



</div>


}



</div>


))

}


</div>


);


}