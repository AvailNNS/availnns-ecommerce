"use client";


import {
  useEffect,
  useMemo,
  useState,
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



import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import CouponBox from "@/components/checkout/CouponBox";
import OrderSummary from "@/components/checkout/OrderSummary";
import SecureCheckout from "@/components/checkout/SecureCheckout";
import LocationPicker from "@/components/checkout/LocationPicker";






export default function CheckoutPage(){



const router = useRouter();



const {

cart,

clearCart,

loading:cartLoading

}=useCart();





const items =
cart?.items || [];





const [user,setUser]=
useState<any>(null);



const [loading,setLoading]=
useState(false);



const [error,setError]=
useState("");





const [coupon,setCoupon]=
useState("");



const [discount,setDiscount]=
useState(0);



const [applied,setApplied]=
useState(false);



const [couponError,setCouponError]=
useState("");






const [delivery,setDelivery]=
useState<
"standard"|"express"
>(
"standard"
);








const [form,setForm]=
useState({


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


}
catch(err){


console.log(err);


}


};



loadUser();



},[]);









// ============================
// AUTO USER DATA
// ============================


useEffect(()=>{


if(user){


setForm(prev=>({


...prev,


name:
user.name || "",



phone:
user.phone || "",



}));


}


},[user]);











// ============================
// CHANGE
// ============================


const handleChange=(

e:React.ChangeEvent<HTMLInputElement>

)=>{


setForm(prev=>({


...prev,


[e.target.name]:
e.target.value



}));


};









const selectPayment=(

method:string

)=>{


setForm(prev=>({


...prev,


paymentMethod:
method



}));


};











// ============================
// PRICE
// ============================


const subtotal =

useMemo(()=>{


return items.reduce(

(sum:number,item:any)=>

sum +

item.price *
item.quantity,

0

);



},[items]);






const shipping =

delivery==="express"

?

25

:

10;






const tax =

subtotal * 0.05;






const total =

subtotal +

shipping +

tax -

discount;











// ============================
// COUPON
// ============================


const applyCoupon=()=>{


if(
coupon.toUpperCase()
==="SAVE10"
){



const amount =
subtotal * 0.10;



setDiscount(amount);


setApplied(true);


setCouponError("");



}
else{


setDiscount(0);


setApplied(false);


setCouponError(
"Invalid coupon code"
);


}


};











// ============================
// LOCATION
// ============================


const setLocation=(data:any)=>{


setForm(prev=>({


...prev,


location:data



}));



};











// ============================
// ORDER
// ============================


const handleSubmit=async(

e:React.FormEvent

)=>{


e.preventDefault();



try{


setLoading(true);


setError("");





if(items.length===0){


setError(
"Cart is empty"
);


return;


}






// BANGLADESH PHONE CHECK


if(
!/^01[3-9]\d{8}$/
.test(form.phone)

){


setError(
"Invalid Bangladesh phone number"
);


return;


}








if(
!form.location.latitude ||
!form.location.longitude
){


setError(
"Please select delivery location"
);


return;


}










const orderData={



shippingAddress:{



fullName:
form.name,



phone:
form.phone,



address:
form.address,



country:
"Bangladesh",




location:{


formattedAddress:
form.location.formattedAddress,



division:
form.location.division,



district:
form.location.district,



area:
form.location.area,



road:
form.location.road,



latitude:
form.location.latitude,



longitude:
form.location.longitude,



googleMapLink:
form.location.googleMapLink,



}


},





paymentMethod:
form.paymentMethod,



transactionId:
form.transactionId || null,



couponCode:
coupon || null,



};









const res =

await createOrder(
orderData
);






const orderId =
res.order._id;









// =====================
// SSL COMMERZ
// =====================


if(
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
form.location.formattedAddress,


});






const url =

payment
?.payment
?.GatewayPageURL;






if(url){


window.location.href=url;


}
else{


setError(
"Payment gateway error"
);


}





}







else{


await clearCart();



router.push(

`/checkout/success?order=${orderId}`

);


}




}
catch(err:any){


console.log(err);



setError(

err?.response?.data?.message ||

"Order failed"

);


}

finally{


setLoading(false);


}



};









if(cartLoading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
">


<Loader2
className="animate-spin"
/>


</div>


);


}









return (

<main className="
min-h-screen
bg-zinc-50
py-10
">


<div className="
mx-auto
max-w-7xl
px-5
">


<CheckoutHeader/>


<CheckoutStepper/>






<form

onSubmit={handleSubmit}

className="
grid
gap-8
lg:grid-cols-3
"

>




<div className="
space-y-6
lg:col-span-2
">





<ShippingForm

form={form}

handleChange={handleChange}

/>






<LocationPicker

location={form.location}

setLocation={setLocation}

/>






<DeliveryOptions

delivery={delivery}

setDelivery={setDelivery}

/>







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

coupon={coupon}

setCoupon={setCoupon}

discount={discount}

applied={applied}

applyCoupon={applyCoupon}

couponError={couponError}

/>







<SecureCheckout/>







{
error &&

<div className="
rounded-xl
bg-red-100
p-4
text-red-600
">

{error}

</div>

}






</div>










<div>


<OrderSummary

items={items}

subtotal={subtotal}

shipping={shipping}

tax={tax}

discount={discount}

total={total}

loading={loading}

/>



</div>






</form>





</div>

</main>


);


}