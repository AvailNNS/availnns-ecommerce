"use client";


import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Trash2,
  TicketPercent,
} from "lucide-react";


import {
  getCoupons,
  createCoupon,
  deleteCoupon,
} from "@/services/coupon.service";



export default function CouponsPage(){


const [coupons,setCoupons]=useState<any[]>([]);


const [form,setForm]=useState({

code:"",
discountValue:"",
minimumAmount:"",
expiryDate:"",

});


const [loading,setLoading]=useState(false);





const loadCoupons = async()=>{

try{

const token =
localStorage.getItem("token") || "";


const data =
await getCoupons(token);


setCoupons(data || []);


}catch(error){

console.log(error);

}

};





useEffect(()=>{

loadCoupons();

},[]);






const handleCreate = async()=>{


try{


if(
!form.code ||
!form.discountValue ||
!form.expiryDate
){

alert("Please fill required fields");

return;

}



setLoading(true);



const token =
localStorage.getItem("token") || "";




await createCoupon(

{

code:
form.code.toUpperCase(),


discountType:
"percentage",


discountValue:
Number(form.discountValue),


minimumAmount:
Number(form.minimumAmount || 0),


expiryDate:
new Date(form.expiryDate),


status:
"active"


},

token

);




setForm({

code:"",
discountValue:"",
minimumAmount:"",
expiryDate:"",

});



await loadCoupons();



}catch(error:any){


console.log(
"CREATE COUPON ERROR:",
error.response?.data || error.message
);


}

finally{

setLoading(false);

}


};







const handleDelete = async(
id:string
)=>{


try{


const token =
localStorage.getItem("token") || "";


await deleteCoupon(
id,
token
);


loadCoupons();



}catch(error){

console.log(error);

}


};







return (

<div className="space-y-8">



{/* HEADER */}

<div>

<h1 className="text-3xl font-black">
Coupons
</h1>


<p className="mt-2 text-gray-500">
Manage discount coupons
</p>


</div>







{/* CREATE */}

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<div className="
mb-6
flex
items-center
gap-3
">


<div className="
rounded-2xl
bg-black
p-3
text-white
">

<TicketPercent/>

</div>


<h2 className="
text-xl
font-bold
">

Create Coupon

</h2>


</div>






<div className="
grid
gap-4
md:grid-cols-4
">





<input

placeholder="Coupon Code"

value={form.code}

onChange={(e)=>

setForm({

...form,

code:e.target.value

})

}

className="
rounded-xl
border
px-4
py-3
"

/>







<input

type="number"

placeholder="Discount %"

value={form.discountValue}

onChange={(e)=>

setForm({

...form,

discountValue:e.target.value

})

}

className="
rounded-xl
border
px-4
py-3
"

/>







<input

type="number"

placeholder="Minimum Purchase"

value={form.minimumAmount}

onChange={(e)=>

setForm({

...form,

minimumAmount:e.target.value

})

}

className="
rounded-xl
border
px-4
py-3
"

/>







<input

type="date"

value={form.expiryDate}

onChange={(e)=>

setForm({

...form,

expiryDate:e.target.value

})

}

className="
rounded-xl
border
px-4
py-3
"

/>





</div>








<button

onClick={handleCreate}

disabled={loading}

className="
mt-5
flex
items-center
gap-2
rounded-xl
bg-black
px-6
py-3
font-semibold
text-white
disabled:opacity-50
"

>


<Plus size={18}/>


{
loading
?
"Creating..."
:
"Create Coupon"
}



</button>




</div>









{/* LIST */}


<div className="
overflow-hidden
rounded-3xl
border
bg-white
">


<table className="
w-full
text-left
">


<thead className="
bg-gray-100
">


<tr>


<th className="p-4">
Code
</th>


<th className="p-4">
Discount
</th>


<th className="p-4">
Minimum
</th>


<th className="p-4">
Expiry
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>






<tbody>


{

coupons.map((coupon)=>(


<tr

key={coupon._id}

className="
border-t
"


>



<td className="
p-4
font-bold
">

{coupon.code}

</td>




<td className="p-4">

{coupon.discountValue}%

</td>





<td className="p-4">

${coupon.minimumAmount}

</td>





<td className="p-4">

{
new Date(
coupon.expiryDate
).toLocaleDateString()
}

</td>





<td className="p-4">


<span className="
rounded-full
bg-green-100
px-3
py-1
text-sm
text-green-700
">

{coupon.status}

</span>


</td>






<td className="p-4">


<button

onClick={()=>
handleDelete(coupon._id)
}

className="
text-red-500
hover:text-red-700
"

>

<Trash2 size={20}/>


</button>


</td>




</tr>


))


}



</tbody>


</table>


</div>




</div>


);


}