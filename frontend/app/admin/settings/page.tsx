"use client";


import {
useEffect,
useState
} from "react";


import {
Settings,
Save
} from "lucide-react";


import api from "@/services/api";




export default function SettingsPage(){


const [loading,setLoading]=useState(false);


const [form,setForm]=useState({

currency:"USD",

symbol:"$",

currencyPosition:"before"

});





const loadSettings = async()=>{


try{


const res =
await api.get("/settings");


setForm(res.data);



}catch(error){

console.log(error);

}


};





useEffect(()=>{

loadSettings();

},[]);







const updateSettings = async()=>{


try{


setLoading(true);


const token =
localStorage.getItem("token");



await api.put(

"/settings",

form,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



alert(
"Settings Updated"
);



}catch(error){

console.log(error);

}


finally{

setLoading(false);

}


};







return (

<div className="space-y-8">



<div>

<h1 className="
text-3xl
font-black
flex
items-center
gap-3
">

<Settings/>

Store Settings

</h1>


<p className="text-gray-500 mt-2">

Manage global ecommerce settings

</p>


</div>








<div className="
max-w-xl
rounded-3xl
border
bg-white
p-6
shadow-sm
">





<div className="space-y-5">





<div>

<label className="
mb-2
block
font-semibold
">

Currency

</label>


<select

value={form.currency}

onChange={(e)=>

setForm({

...form,

currency:e.target.value

})

}

className="
w-full
rounded-xl
border
p-3
"


>


<option value="USD">
USD - Dollar
</option>


<option value="SAR">
SAR - Riyal
</option>


<option value="BDT">
BDT - Taka
</option>


<option value="EUR">
EUR - Euro
</option>


</select>


</div>







<div>


<label className="
mb-2
block
font-semibold
">

Currency Symbol

</label>


<input

value={form.symbol}

onChange={(e)=>

setForm({

...form,

symbol:e.target.value

})

}


className="
w-full
rounded-xl
border
p-3
"


/>


</div>








<div>


<label className="
mb-2
block
font-semibold
">

Position

</label>


<select

value={form.currencyPosition}

onChange={(e)=>

setForm({

...form,

currencyPosition:e.target.value

})

}

className="
w-full
rounded-xl
border
p-3
"

>


<option value="before">

Before Price

</option>


<option value="after">

After Price

</option>


</select>



</div>







<button

onClick={updateSettings}

disabled={loading}

className="
flex
items-center
gap-2
rounded-xl
bg-black
px-6
py-3
font-semibold
text-white
"


>


<Save size={18}/>


{
loading
?
"Saving..."
:
"Save Settings"
}


</button>





</div>




</div>





</div>


);


}