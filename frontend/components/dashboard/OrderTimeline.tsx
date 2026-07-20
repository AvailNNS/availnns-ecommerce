"use client";


const steps = [
  {
    key:"pending",
    label:"Order Placed",
    description:"Your order has been received",
  },

  {
    key:"confirmed",
    label:"Confirmed",
    description:"Order confirmed by seller",
  },

  {
    key:"processing",
    label:"Processing",
    description:"Your order is being prepared",
  },

  {
    key:"shipped",
    label:"Shipped",
    description:"Order is on the way",
  },

  {
    key:"delivered",
    label:"Delivered",
    description:"Order delivered successfully",
  },

];



export default function OrderTimeline({
  status
}:{
  status:string;
}){


const currentIndex =
steps.findIndex(
(step)=>
step.key === status
);





// cancelled

if(status==="cancelled"){

return (

<div className="
rounded-xl
bg-red-50
p-5
flex
items-center
gap-4
">


<div className="
w-10
h-10
rounded-full
bg-red-500
text-white
flex
items-center
justify-center
font-bold
">

!

</div>


<div>

<h3 className="
font-bold
text-red-600
">

Order Cancelled

</h3>


<p className="
text-sm
text-red-500
">

This order was cancelled

</p>


</div>


</div>

);


}





return (

<div className="
space-y-8
">

{
steps.map(
(step,index)=>{


const completed =
currentIndex >= index;



return (

<div

key={step.key}

className="
flex
items-start
gap-4
relative
"

>


<div

className={`
w-10
h-10
rounded-full
flex
items-center
justify-center
font-bold
shrink-0

${
completed

?

"bg-black text-white"

:

"bg-gray-200 text-gray-500"

}

`}

>

{index+1}

</div>





<div>

<h3 className="
font-semibold
">

{step.label}

</h3>


<p className="
text-sm
text-gray-500
">

{step.description}

</p>


</div>



</div>


);


}

)

}

</div>

);

}