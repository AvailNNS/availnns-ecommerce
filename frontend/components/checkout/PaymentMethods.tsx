"use client";

import {
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";


interface Props {

  paymentMethod:string;

  transactionId:string;

  selectPayment:(method:string)=>void;

  handleChange:(
    e:React.ChangeEvent<HTMLInputElement>
  )=>void;

}



export default function PaymentMethods({

  paymentMethod,

  transactionId,

  selectPayment,

  handleChange,

}:Props){



const methods=[

{
value:"COD",
label:"Cash On Delivery",
icon:Banknote,
description:"Pay after receiving your order"
},


{
value:"CARD",
label:"Card Payment",
icon:CreditCard,
description:"Visa / Mastercard"
},


{
value:"BKASH",
label:"bKash",
icon:Wallet,
description:"Mobile payment"
},


{
value:"NAGAD",
label:"Nagad",
icon:Wallet,
description:"Mobile payment"
},

];




return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-6
text-xl
font-bold
">

Payment Method

</h2>





<div className="
grid
gap-4
md:grid-cols-2
">


{
methods.map((method)=>(


<button

key={method.value}

type="button"

onClick={()=>selectPayment(method.value)}

className={`

rounded-2xl

border

p-5

text-left

transition

${
paymentMethod===method.value

?

"border-black bg-zinc-100"

:

"border-zinc-200 hover:border-zinc-400"

}

`}

>


<div className="
flex
items-center
gap-4
">


<div className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-zinc-100
">


<method.icon size={24}/>


</div>





<div>


<h3 className="
font-semibold
">

{method.label}

</h3>



<p className="
mt-1
text-sm
text-zinc-500
">

{method.description}

</p>



</div>



</div>


</button>


))

}


</div>







{
paymentMethod!=="COD" &&

<div className="
mt-6
">


<label className="
mb-2
block
text-sm
font-medium
">

Transaction ID

</label>



<input

name="transactionId"

value={transactionId}

onChange={handleChange}

placeholder="Enter transaction ID"

className="
w-full
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>



</div>

}





</div>


);


}