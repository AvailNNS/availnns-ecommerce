"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
  useSearchParams,
} from "next/navigation";


import {
  Loader2,
  CreditCard,
} from "lucide-react";






export default function PaymentRedirectPage(){



const router =
useRouter();



const searchParams =
useSearchParams();




const [
loading,
setLoading
]=useState(true);







useEffect(()=>{


const url =

searchParams.get(
"url"
);





if(!url){


router.replace(
"/checkout"
);


return;


}







const redirectPayment = async()=>{


try{


setLoading(true);





window.location.href = url;





}

catch(error){


console.log(
"PAYMENT REDIRECT ERROR",
error
);



router.replace(
"/checkout"
);



}

};






redirectPayment();



},[
router,
searchParams
]);










return (

<main

className="
min-h-screen
flex
items-center
justify-center
bg-zinc-50
px-4
"

>


<div

className="
rounded-3xl
border
bg-white
p-10
shadow-xl
text-center
"

>


<div

className="
flex
justify-center
mb-6
"

>


<div

className="
rounded-full
bg-green-100
p-5
"

>


<CreditCard

size={45}

className="
text-green-600
"

/>


</div>


</div>







<h1

className="
text-2xl
font-black
"

>

Redirecting To Payment

</h1>







<p

className="
mt-3
text-zinc-500
"

>

Please wait while we connect you to secure payment gateway.

</p>








<Loader2

className="
mx-auto
mt-6
h-8
w-8
animate-spin
"

/>





</div>



</main>


);


}