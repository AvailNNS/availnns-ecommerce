"use client";

import { MapPin } from "lucide-react";


interface FormData {
  name:string;
  phone:string;
  address:string;
  city:string;
  state:string;
  postalCode:string;
  country:string;
}


interface Props {

  form:FormData;

  handleChange:(
    e:React.ChangeEvent<HTMLInputElement>
  )=>void;

}



export default function ShippingForm({
  form,
  handleChange,
}:Props){


return (

<div className="
rounded-3xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-6
flex
items-center
gap-3
text-xl
font-bold
">

<MapPin size={24}/>

Shipping Address

</h2>



<div className="
space-y-5
">


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Full Name"

required

className="
w-full
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>





<input

name="phone"

value={form.phone}

onChange={handleChange}

placeholder="Phone Number"

required

className="
w-full
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>






<input

name="address"

value={form.address}

onChange={handleChange}

placeholder="Address"

required

className="
w-full
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>





<div className="
grid
gap-4
md:grid-cols-3
">


<input

name="city"

value={form.city}

onChange={handleChange}

placeholder="City"

className="
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>




<input

name="state"

value={form.state}

onChange={handleChange}

placeholder="State"

className="
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>





<input

name="postalCode"

value={form.postalCode}

onChange={handleChange}

placeholder="Postal Code"

className="
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>


</div>






<input

name="country"

value={form.country}

onChange={handleChange}

placeholder="Country"

className="
w-full
rounded-xl
border
p-4
outline-none
focus:border-black
"

/>





</div>


</div>


);

}