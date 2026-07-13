"use client";


import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";


import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ShoppingBag,
  Loader2
} from "lucide-react";


import useCart from "@/hooks/useCart";


import {
  createOrder
} from "@/services/order.service";




export default function CheckoutPage(){


const router = useRouter();


const {
 cart,
 clearCart,
 loading:cartLoading
}=useCart();



const items = cart?.items || [];



const [loading,setLoading]=useState(false);

const [error,setError]=useState("");




const [form,setForm]=useState({

name:"",
phone:"",
address:"",
city:"",
state:"",
postalCode:"",
country:"Saudi Arabia",

paymentMethod:"COD",

transactionId:""

});






const handleChange = (
e:React.ChangeEvent<HTMLInputElement>
)=>{


setForm(prev=>({

...prev,

[e.target.name]:e.target.value

}));


};






const selectPayment=(method:string)=>{


setForm(prev=>({

...prev,

paymentMethod:method

}));


};








const subtotal = items.reduce(

(sum:number,item:any)=>

sum +

(
Number(item.price || 0)
*
Number(item.quantity || 1)
),

0

);





const shipping =
subtotal > 0 ? 10 : 0;



const tax =
subtotal * 0.05;



const total =
subtotal + shipping + tax;










const handleSubmit = async(
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



totalPrice:
total


};





console.log(
"ORDER DATA:",
orderData
);





await createOrder(
orderData
);





await clearCart();



router.push(
"/checkout/success"
);



}catch(err:any){


console.log(
"ORDER ERROR:",
err
);


setError(

err?.response?.data?.message ||

"Order creation failed"

);


}finally{


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

<Loader2 className="animate-spin"/>

</div>

);


}








return (

<div className="
min-h-screen
bg-gray-50
py-10
">


<div className="
max-w-7xl
mx-auto
px-5
">



<h1 className="
text-4xl
font-bold
mb-8
">

Checkout

</h1>





<form

onSubmit={handleSubmit}

className="
grid
lg:grid-cols-3
gap-8
"


>





{/* LEFT */}


<div className="
lg:col-span-2
space-y-6
">





<div className="
bg-white
rounded-3xl
shadow
p-8
">


<h2 className="
text-xl
font-bold
flex
items-center
gap-2
mb-6
">

<MapPin/>

Shipping Address

</h2>





<div className="
space-y-4
">


<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

className="
w-full
border
rounded-xl
p-3
"

required

/>





<input

name="phone"

placeholder="Phone Number"

value={form.phone}

onChange={handleChange}

className="
w-full
border
rounded-xl
p-3
"

required

/>





<input

name="address"

placeholder="Address"

value={form.address}

onChange={handleChange}

className="
w-full
border
rounded-xl
p-3
"

required

/>







<div className="
grid
md:grid-cols-3
gap-4
">


<input

name="city"

placeholder="City"

value={form.city}

onChange={handleChange}

className="
border
rounded-xl
p-3
"

/>




<input

name="state"

placeholder="State"

value={form.state}

onChange={handleChange}

className="
border
rounded-xl
p-3
"

/>




<input

name="postalCode"

placeholder="Postal Code"

value={form.postalCode}

onChange={handleChange}

className="
border
rounded-xl
p-3
"

/>


</div>




</div>



</div>










{/* PAYMENT */}



<div className="
bg-white
rounded-3xl
shadow
p-8
">


<h2 className="
text-xl
font-bold
flex
gap-2
mb-5
">

<CreditCard/>

Payment Method

</h2>




<div className="
grid
grid-cols-2
md:grid-cols-4
gap-4
">



{
[

["COD","Cash",Banknote],

["CARD","Card",CreditCard],

["BKASH","bKash",Wallet],

["NAGAD","Nagad",Wallet]

].map(
([value,label,Icon]:any)=>(


<button

type="button"

key={value}

onClick={()=>selectPayment(value)}

className={`
border
rounded-2xl
p-5
flex
flex-col
items-center
gap-2

${
form.paymentMethod===value
?
"bg-black text-white"
:
"bg-white"
}

`}

>


<Icon size={25}/>

{label}


</button>


)

)


}




</div>







{
form.paymentMethod!=="COD" &&

<input

name="transactionId"

placeholder="Transaction ID"

value={form.transactionId}

onChange={handleChange}

className="
mt-5
w-full
border
rounded-xl
p-3
"

/>


}





</div>






</div>









{/* SUMMARY */}



<div>


<div className="
bg-white
rounded-3xl
shadow
p-6
sticky
top-5
">



<h2 className="
font-bold
text-xl
flex
gap-2
mb-5
">

<ShoppingBag/>

Order Summary

</h2>






{
items.map(
(item:any)=>(


<div

key={item._id}

className="
flex
justify-between
mb-3
text-sm
"

>


<span>

{item.product.name}

× {item.quantity}

</span>



<span>

${item.price * item.quantity}

</span>


</div>


)

)

}





<hr className="my-5"/>



<div className="
space-y-3
">


<div className="flex justify-between">

<span>Subtotal</span>

<span>${subtotal.toFixed(2)}</span>

</div>




<div className="flex justify-between">

<span>Shipping</span>

<span>${shipping}</span>

</div>





<div className="flex justify-between">

<span>Tax</span>

<span>${tax.toFixed(2)}</span>

</div>





<div className="
flex
justify-between
font-bold
text-xl
">


<span>Total</span>

<span>

${total.toFixed(2)}

</span>


</div>



</div>







{
error &&

<p className="
text-red-500
mt-5
">

{error}

</p>

}







<button

disabled={
loading ||
items.length===0
}

className="
mt-6
w-full
bg-black
text-white
py-4
rounded-2xl
font-bold
disabled:opacity-50
"

>


{
loading
?
"Processing..."
:
"Place Order"
}


</button>







</div>



</div>





</form>



</div>



</div>


);


}