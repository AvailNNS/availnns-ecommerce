"use client";


import {
  Loader2,
  CreditCard,
} from "lucide-react";



interface PaymentRedirectProps {

loading:boolean;

}



export default function PaymentRedirect({

loading,

}:PaymentRedirectProps){



if(!loading){

return null;

}



return (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/50
backdrop-blur-sm
"

>


<div

className="
rounded-3xl
bg-white
p-8
text-center
shadow-2xl
"

>


<div

className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-zinc-100
"

>


<CreditCard

size={40}

/>


</div>






<h2

className="
mt-5
text-xl
font-black
"

>

Redirecting to Payment

</h2>






<p

className="
mt-2
text-sm
text-zinc-500
"

>

Please wait while we connect you with secure payment gateway.

</p>





<Loader2

className="
mx-auto
mt-5
animate-spin
"

size={30}

/>





</div>


</div>


);


}