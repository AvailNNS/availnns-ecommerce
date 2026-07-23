"use client";


import {
  useRouter,
} from "next/navigation";


import {
  useEffect,
  useState,
} from "react";


import CheckoutHeader 
from "@/components/checkout/CheckoutHeader";


import CheckoutStepper 
from "@/components/checkout/CheckoutStepper";


import PaymentMethods 
from "@/components/checkout/PaymentMethods";


import CouponBox 
from "@/components/checkout/CouponBox";


import api 
from "@/services/api";





export default function PaymentPage(){



const router = useRouter();





const [
paymentMethod,
setPaymentMethod
]=useState("COD");



const [
transactionId,
setTransactionId
]=useState("");



const [
coupon,
setCoupon
]=useState("");



const [
discount,
setDiscount
]=useState(0);



const [
applied,
setApplied
]=useState(false);



const [
couponError,
setCouponError
]=useState("");



const [
error,
setError
]=useState("");









// =====================
// LOAD CHECKOUT DATA
// =====================


useEffect(()=>{


const data =

sessionStorage.getItem(
"checkoutData"
);





if(!data){


router.replace(
"/checkout"
);


return;


}





const checkout =

JSON.parse(data);






if(checkout.paymentMethod){


setPaymentMethod(
checkout.paymentMethod
);


}




if(checkout.transactionId){


setTransactionId(
checkout.transactionId
);


}




if(checkout.couponCode){


setCoupon(
checkout.couponCode
);


}





if(checkout.discount){


setDiscount(
checkout.discount
);


setApplied(true);


}




},[router]);









// =====================
// PAYMENT SELECT
// =====================


const selectPayment=(

method:string

)=>{


setPaymentMethod(method);


};









// =====================
// APPLY COUPON
// =====================


const applyCoupon = async()=>{


try{


setCouponError("");




const checkout =

JSON.parse(

sessionStorage.getItem(
"checkoutData"
) || "{}"

);







const res =

await api.post(

"/coupons/apply",

{

code:coupon,


amount:
checkout.subtotal || 0


}

);







if(res.data.success){


setDiscount(
res.data.discount
);


setApplied(true);


}

else{


setDiscount(0);

setApplied(false);


setCouponError(
"Invalid coupon"
);


}




}

catch(error:any){



setDiscount(0);


setApplied(false);



setCouponError(

error?.response?.data?.message

||

"Invalid coupon"

);


}



};









// =====================
// CONTINUE REVIEW
// =====================


const continueReview=()=>{


setError("");






if(

paymentMethod==="BKASH"

||

paymentMethod==="NAGAD"

){


if(
!transactionId.trim()
){


setError(
"Transaction ID required"
);


return;


}


}








const oldData =

JSON.parse(

sessionStorage.getItem(
"checkoutData"
) || "{}"

);







sessionStorage.setItem(

"checkoutData",

JSON.stringify({

...oldData,


paymentMethod,


transactionId,


couponCode:
coupon,


discount,


})

);






router.push(

"/checkout/review"

);



};









return (

<main

className="
min-h-screen
bg-zinc-50
py-10
"

>


<div

className="
mx-auto
max-w-5xl
px-4
"

>


<CheckoutHeader />






<CheckoutStepper

currentStep={3}

/>









<div

className="
mt-8
space-y-6
"

>







{/* PAYMENT METHOD */}



<PaymentMethods


paymentMethod={paymentMethod}


transactionId={transactionId}


selectPayment={selectPayment}



handleChange={(e:any)=>

setTransactionId(

e.target.value

)

}


/>









{/* COUPON */}



<CouponBox


coupon={coupon}


setCoupon={setCoupon}


discount={discount}


applied={applied}


applyCoupon={applyCoupon}


couponError={couponError}


/>









{

error &&

<div

className="
rounded-xl
border
border-red-200
bg-red-50
p-4
font-semibold
text-red-600
"

>

{error}

</div>


}









<div

className="
flex
gap-4
"

>






<button

type="button"

onClick={()=>router.push("/checkout")}

className="
w-1/3
rounded-xl
border
py-4
font-bold
"

>


Back


</button>









<button

type="button"

onClick={continueReview}

className="
w-full
rounded-xl
bg-black
py-4
font-bold
text-white
hover:bg-zinc-800
"

>


Continue Review


</button>







</div>









</div>





</div>


</main>


);


}