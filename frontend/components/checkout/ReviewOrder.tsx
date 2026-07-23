"use client";


import {
  MapPin,
  Phone,
  User,
  CreditCard,
  CheckCircle,
} from "lucide-react";



interface ReviewOrderProps {

  form:any;

  selectedZone:string;

  zoneName:string;

  onConfirm:()=>void;

  loading:boolean;

}




export default function ReviewOrder({

  form,

  selectedZone,

  zoneName,

  onConfirm,

  loading,

}:ReviewOrderProps){



return (

<div

className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"

>


<h2

className="
mb-6
text-xl
font-black
"

>

Review Your Order

</h2>







<div

className="
space-y-5
"

>





{/* CUSTOMER */}

<div

className="
flex
gap-4
rounded-2xl
bg-zinc-50
p-4
"

>

<User
className="text-zinc-700"
/>


<div>

<p className="text-sm text-zinc-500">
Customer
</p>


<p className="font-bold">
{form.name}
</p>


</div>


</div>







{/* PHONE */}

<div

className="
flex
gap-4
rounded-2xl
bg-zinc-50
p-4
"

>

<Phone
className="text-zinc-700"
/>


<div>

<p className="text-sm text-zinc-500">
Phone
</p>


<p className="font-bold">
{form.phone}
</p>


</div>


</div>








{/* LOCATION */}

<div

className="
flex
gap-4
rounded-2xl
bg-zinc-50
p-4
"

>

<MapPin
className="text-zinc-700"
/>


<div>

<p className="text-sm text-zinc-500">
Delivery Location
</p>


<p className="font-bold">

{
form.location?.formattedAddress ||
"No location selected"
}

</p>


</div>


</div>









{/* DELIVERY ZONE */}

<div

className="
flex
gap-4
rounded-2xl
bg-zinc-50
p-4
"

>

<CheckCircle
className="text-zinc-700"
/>


<div>

<p className="text-sm text-zinc-500">
Delivery Area
</p>


<p className="font-bold">

{zoneName || "Not selected"}

</p>


</div>


</div>









{/* PAYMENT */}

<div

className="
flex
gap-4
rounded-2xl
bg-zinc-50
p-4
"

>


<CreditCard
className="text-zinc-700"
/>


<div>

<p className="text-sm text-zinc-500">
Payment Method
</p>


<p className="font-bold">

{
form.paymentMethod
}

</p>


</div>


</div>





</div>








<button

type="button"

onClick={onConfirm}

disabled={loading}

className="
mt-8
w-full
rounded-xl
bg-black
py-4
font-bold
text-white
transition
disabled:opacity-50
"

>


{

loading

?

"Processing..."

:

"Confirm Order"

}



</button>





</div>


);


}