"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import CouponBox from "@/components/checkout/CouponBox";
import OrderSummary from "@/components/checkout/OrderSummary";
import SecureCheckout from "@/components/checkout/SecureCheckout";


import useCart from "@/hooks/useCart";

import {
  createOrder,
} from "@/services/order.service";

import {
  Loader2,
} from "lucide-react";



export default function CheckoutPage(){


const router = useRouter();


const {
 cart,
 clearCart,
 loading:cartLoading,
}=useCart();



const items = cart?.items || [];




const [loading,setLoading]
=
useState(false);



const [error,setError]
=
useState("");



const [coupon,setCoupon]
=
useState("");



const [discount,setDiscount]
=
useState(0);



const [applied,setApplied]
=
useState(false);



const [couponError,setCouponError]
=
useState("");



const [delivery,setDelivery]
=
useState<
"standard" | "express"
>("standard");




const [form,setForm]
=
useState({

name:"",

phone:"",

address:"",

city:"",

state:"",

postalCode:"",

country:"Saudi Arabia",

paymentMethod:"COD",

transactionId:"",

});






const handleChange = (
e:React.ChangeEvent<HTMLInputElement>
)=>{


setForm(prev=>({

...prev,

[e.target.name]:
e.target.value

}));


};







const selectPayment=(method:string)=>{


setForm(prev=>({

...prev,

paymentMethod:method

}));


};






const subtotal =
useMemo(()=>{


return items.reduce(

(sum:number,item:any)=>

sum +

(
item.price *
item.quantity
),

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








const applyCoupon=()=>{


if(coupon.toUpperCase()==="SAVE10"){


const value =
subtotal * 0.10;


setDiscount(value);

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








const handleSubmit =
async(
e:React.FormEvent
)=>{


e.preventDefault();


try{


setLoading(true);

setError("");




if(items.length===0){

setError(
"Your cart is empty"
);

return;

}





const orderData={


items:items.map(

(item:any)=>({

product:item.product._id,

quantity:item.quantity,

price:item.price

})

),



shippingAddress:{


fullName:
form.name,


phone:
form.phone,


address:
form.address,


city:
form.city,


state:
form.state,


postalCode:
form.postalCode,


country:
form.country


},



paymentMethod:
form.paymentMethod,


transactionId:
form.transactionId || null,


couponCode:
coupon || null,


totalPrice:
total



};






const res =
await createOrder(
orderData
);





await clearCart();





router.push(

`/checkout/success?order=${res.order._id}`

);




}

catch(err:any){


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
max-w-7xl
mx-auto
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
lg:col-span-2
space-y-6
">


<ShippingForm

form={form}

handleChange={handleChange}

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

<p className="
rounded-xl
bg-red-50
p-4
text-red-600
">

{error}

</p>

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