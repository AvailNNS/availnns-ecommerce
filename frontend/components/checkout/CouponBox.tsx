"use client";

import {
  Tag,
  CheckCircle2,
} from "lucide-react";


interface Props {

  coupon:string;

  setCoupon:(value:string)=>void;

  discount:number;

  applied:boolean;

  applyCoupon:()=>void;

  couponError:string;

}



export default function CouponBox({

  coupon,

  setCoupon,

  discount,

  applied,

  applyCoupon,

  couponError,

}:Props){



return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-5
flex
items-center
gap-2
text-xl
font-bold
">

<Tag size={22}/>

Coupon Code

</h2>





<div className="
flex
gap-3
">


<input

value={coupon}

onChange={(e)=>
setCoupon(e.target.value)
}

placeholder="Enter coupon code"

className="
flex-1
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>





<button

type="button"

onClick={applyCoupon}

className="
rounded-xl
bg-black
px-6
font-semibold
text-white
transition
hover:bg-zinc-800
"

>

Apply

</button>



</div>







{
applied &&

<div className="
mt-5
flex
items-center
gap-3
rounded-xl
bg-green-50
p-4
text-green-700
">


<CheckCircle2 size={20}/>


<div>

<p className="
font-semibold
">

Coupon Applied

</p>


<p className="
text-sm
">

You saved ${discount.toFixed(2)}

</p>


</div>



</div>

}







{
couponError &&

<p className="
mt-4
text-sm
text-red-500
">

{couponError}

</p>

}





</div>

);


}