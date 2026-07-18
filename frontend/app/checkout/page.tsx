"use client";

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Loader2,
} from "lucide-react";


import api from "@/services/api";

import {
  createOrder,
} from "@/services/order.service";


import {
  initiatePayment,
} from "@/services/payment.service";


import useCart from "@/hooks/useCart";


import {
  useCurrency,
} from "@/context/CurrencyContext";



import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import CouponBox from "@/components/checkout/CouponBox";
import OrderSummary from "@/components/checkout/OrderSummary";
import SecureCheckout from "@/components/checkout/SecureCheckout";
import LocationPicker from "@/components/checkout/LocationPicker";


import {
  getDeliveryZones,
} from "@/services/deliveryZone.service";





export default function CheckoutPage(){


const router = useRouter();


const {
 cart,
 clearCart,
 loading:cartLoading
}=useCart();



const {
 formatPrice
}=useCurrency();



const [
 isPending,
 startTransition
]=useTransition();



const items =
useMemo(
()=>cart?.items || [],
[cart]
);





// ============================
// STATES
// ============================


const [
 user,
 setUser
]=useState<any>(null);



const [
 loading,
 setLoading
]=useState(false);



const [
 error,
 setError
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





// DELIVERY ZONE

const [
 zones,
 setZones
]=useState<any[]>([]);



const [
 selectedZone,
 setSelectedZone
]=useState("");






const [
 form,
 setForm
]=useState({

name:"",

phone:"",

address:"",

country:"Bangladesh",


location:{

formattedAddress:"",

division:"",

district:"",

area:"",

road:"",

latitude:"",

longitude:"",

googleMapLink:"",

},


paymentMethod:"COD",

transactionId:"",


});






// ============================
// LOAD DELIVERY ZONES
// ============================


useEffect(()=>{


const loadZones=async()=>{


try{


const data =
await getDeliveryZones();



setZones(
data.filter(
(z:any)=>z.active
)
);



}catch(error){

console.log(error);

}


};


loadZones();


},[]);





// ============================
// LOAD USER
// ============================


useEffect(()=>{


const loadUser=async()=>{


try{


const res =
await api.get(
"/users/me"
);



setUser(
res.data.user
);



}catch(error){

console.log(error);

}


};


loadUser();


},[]);





useEffect(()=>{


if(user){


setForm(prev=>({

...prev,


name:user.name || "",

phone:user.phone || "",


}));


}


},[user]);






// ============================
// PRICE
// ============================


const subtotal = useMemo(()=>{


return items.reduce(

(sum:number,item:any)=>

sum +
item.price *
item.quantity,


0

);



},[items]);






const shipping = useMemo(()=>{


const zone =
zones.find(
(z:any)=>
z._id === selectedZone
);



return zone?.deliveryFee || 0;



},[
zones,
selectedZone
]);





const tax =
subtotal * 0.05;



const total =
Math.max(

0,

subtotal +
shipping +
tax -
discount

);

// ============================
// INPUT HANDLER
// ============================


const handleChange = (
e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement
>
)=>{


setForm(prev=>({

...prev,

[e.target.name]:
e.target.value


}));


};





// ============================
// PAYMENT SELECT
// ============================


const selectPayment = (
method:string
)=>{


setForm(prev=>({

...prev,

paymentMethod:method


}));


};






// ============================
// LOCATION
// ============================


const setLocation = (
data:any
)=>{


setForm(prev=>({

...prev,

location:data


}));


};







// ============================
// APPLY COUPON
// ============================


const applyCoupon = async()=>{


if(!coupon.trim()){


setCouponError(
"Please enter coupon code"
);


return;


}



try{


setCouponError("");



const res =
await api.post(

"/coupons/apply",

{

code:coupon,

amount:subtotal,

}

);




if(res.data.success){


setDiscount(
res.data.discount
);


setApplied(true);



}



}catch(error:any){



setDiscount(0);


setApplied(false);



setCouponError(

error?.response?.data?.message
||
"Invalid coupon code"

);



}



};








// ============================
// SUBMIT ORDER
// ============================


const handleSubmit = async(
e:React.FormEvent
)=>{


e.preventDefault();



if(
loading ||
isPending
)
return;



setLoading(true);

setError("");




try{


if(
items.length===0
)
throw new Error(
"Your cart is empty"
);



if(
!form.name.trim()
)
throw new Error(
"Name required"
);



if(
!/^01[3-9]\d{8}$/.test(
form.phone
)
)
throw new Error(
"Invalid Bangladesh phone number"
);




if(
!form.address.trim()
)
throw new Error(
"Address required"
);




if(
!selectedZone
)
throw new Error(
"Select delivery area"
);




if(
!form.location.latitude ||
!form.location.longitude
)
throw new Error(
"Select map location"
);







const zone =
zones.find(
(z:any)=>
z._id===selectedZone
);







const orderData = {



shippingAddress:{


fullName:
form.name,


phone:
form.phone,


address:
form.address,


country:
"Bangladesh",


location:
form.location,


},




deliveryZone:
selectedZone,



deliveryZoneName:
zone?.name,



deliveryFee:
shipping,





paymentMethod:
form.paymentMethod,



transactionId:
form.transactionId
?
form.transactionId.trim()
:
null,



couponCode:
applied
?
coupon
:null,



};








const res =
await createOrder(
orderData
);



const orderId =
res.order._id;







if(
form.paymentMethod==="CARD" ||
form.paymentMethod==="SSLCOMMERZ"
){



const payment =
await initiatePayment({

orderId,


amount:
total,


customerName:
form.name,


phone:
form.phone,


address:
form.location.formattedAddress ||
form.address,


});





if(
payment?.payment?.GatewayPageURL
){


window.location.href =
payment.payment.GatewayPageURL;


}else{


throw new Error(
"Payment failed"
);


}





}else{



await clearCart();



startTransition(()=>{


router.push(
`/checkout/success?order=${orderId}`
);


});



}





}catch(error:any){



setError(

error?.message ||
"Order failed"

);



}finally{


setLoading(false);


}

};

if(cartLoading){

return (

<div
className="
flex
min-h-screen
items-center
justify-center
bg-white
"
>

<Loader2
className="
h-10
w-10
animate-spin
"
/>

</div>

);

}





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
max-w-7xl
px-4
sm:px-6
lg:px-8
"
>


<CheckoutHeader />


<CheckoutStepper
currentStep={3}
/>





<form

onSubmit={handleSubmit}

className="
mt-8
grid
gap-8
lg:grid-cols-3
items-start
"

>



{/* LEFT SIDE */}

<div
className="
space-y-6
lg:col-span-2
"
>



<ShippingForm

form={form}

handleChange={handleChange}

/>





<LocationPicker

location={form.location}

setLocation={setLocation}

/>








{/* DELIVERY AREA */}


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
mb-4
text-xl
font-black
"
>

Delivery Area

</h2>




<select

value={selectedZone}

onChange={(e)=>
setSelectedZone(
e.target.value
)
}


className="
w-full
rounded-xl
border
p-4
outline-none
focus:border-black
"

>


<option value="">

Select delivery area

</option>




{

zones.map(
(zone:any)=>(


<option

key={zone._id}

value={zone._id}

>


{zone.name}

-

{formatPrice(
zone.deliveryFee
)}



</option>


)

)


}



</select>



</div>









<PaymentMethods


paymentMethod={
form.paymentMethod
}


transactionId={
form.transactionId
}


selectPayment={
selectPayment
}


handleChange={
handleChange
}


/>








<CouponBox


coupon={
coupon
}


setCoupon={
setCoupon
}


discount={
discount
}


applied={
applied
}


applyCoupon={
applyCoupon
}


couponError={
couponError
}


/>







<SecureCheckout />






{

error &&

<div

className="
rounded-2xl
border
border-red-200
bg-red-50
p-4
text-sm
font-semibold
text-red-600
"

>

{error}


</div>

}





</div>







{/* RIGHT SIDE */}



<div

className="
lg:sticky
lg:top-6
"

>


<OrderSummary


items={
items
}


subtotal={
subtotal
}


shipping={
shipping
}


tax={
tax
}


discount={
discount
}


total={
total
}


loading={
loading ||
isPending
}


/>


</div>






</form>




</div>


</main>


);

}