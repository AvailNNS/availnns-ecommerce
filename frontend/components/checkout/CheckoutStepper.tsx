"use client";


import {
  Check,
  ShoppingCart,
  MapPin,
  CreditCard,
  ClipboardList,
  BadgeCheck,
} from "lucide-react";



interface CheckoutStepperProps {

  currentStep:number;

}



const steps = [

{
id:1,
title:"Cart",
icon:ShoppingCart,
},


{
id:2,
title:"Checkout",
icon:MapPin,
},


{
id:3,
title:"Payment",
icon:CreditCard,
},


{
id:4,
title:"Review",
icon:ClipboardList,
},


{
id:5,
title:"Success",
icon:BadgeCheck,
},


];






export default function CheckoutStepper({

currentStep

}:CheckoutStepperProps){



return (

<div
className="
mb-10
overflow-x-auto
"
>


<div

className="
flex
min-w-[700px]
items-center
justify-center
"

>



{

steps.map(

(step,index)=>{


const Icon = step.icon;



const completed =
currentStep > step.id;



const active =
currentStep === step.id;



return (

<div

key={step.id}

className="
flex
items-center
"

>





<div

className="
flex
flex-col
items-center
"

>


<div

className={`

flex

h-14

w-14

items-center

justify-center

rounded-full

border-2

transition-all

duration-300


${
completed

?

"bg-green-600 border-green-600 text-white"

:

active

?

"bg-black border-black text-white scale-110"

:

"bg-white border-zinc-300 text-zinc-400"

}

`}

>


{

completed

?

<Check size={22}/>

:

<Icon size={22}/>

}



</div>






<p

className={`

mt-3

text-sm

font-bold


${
active

?

"text-black"

:

completed

?

"text-green-600"

:

"text-zinc-400"

}

`}

>

{step.title}

</p>





</div>








{

index !== steps.length-1 && (

<div

className={`

mx-4

h-1

w-20

rounded-full


${
currentStep > step.id

?

"bg-green-600"

:

"bg-zinc-200"

}

`

}

/>


)

}




</div>


)

}

)

}




</div>


</div>


);


}