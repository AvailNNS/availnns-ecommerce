"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Loader2,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import api from "@/services/api";


export default function AdminLoginPage() {


const router = useRouter();



const [formData,setFormData] = useState({

email:"",
password:"",

});



const [showPassword,setShowPassword] =
useState(false);



const [rememberMe,setRememberMe] =
useState(false);



const [error,setError] =
useState("");



const [loading,setLoading] =
useState(false);





const handleLogin = async(
e:React.FormEvent
)=>{


e.preventDefault();


setLoading(true);

setError("");



try{


const {data} =
await api.post(
"/auth/login",
formData
);





if(!data.success){


throw new Error(

data.message ||
"Login failed"

);

}






const user =
data.user;



if(!user){


throw new Error(
"User data missing"
);


}






if(user.role !== "admin"){


throw new Error(

"Access denied. Admin account required."

);


}







localStorage.setItem(

"token",

data.token

);





localStorage.setItem(

"user",

JSON.stringify(user)

);






if(rememberMe){


localStorage.setItem(

"rememberAdmin",

"true"

);


}





router.push(
"/admin"
);



router.refresh();






}catch(err:any){


setError(

err?.response?.data?.message ||

err?.message ||

"Invalid credentials"

);



}finally{


setLoading(false);


}



};







return (

<div
className="
min-h-screen
bg-gradient-to-br
from-slate-50
via-white
to-slate-100
flex
items-center
justify-center
px-4
"
>


<div
className="
w-full
max-w-md
bg-white
rounded-3xl
shadow-2xl
border
border-slate-200
p-8
"
>


<div className="text-center mb-8">


<div
className="
mx-auto
w-16
h-16
rounded-2xl
bg-black
text-white
flex
items-center
justify-center
"
>


<ShieldCheck size={28}/>


</div>



<h1
className="
mt-5
text-3xl
font-bold
"
>

AvailNNS Admin

</h1>



<p
className="
text-slate-500
mt-2
"
>

Secure access to the management panel

</p>



</div>






{
error &&

<div
className="
mb-5
flex
items-center
gap-2
rounded-xl
border
border-red-200
bg-red-50
px-4
py-3
text-sm
text-red-600
"
>


<AlertCircle size={18}/>


<span>
{error}
</span>


</div>

}







<form
onSubmit={handleLogin}
className="
space-y-5
"
>





<div>


<label
className="
text-sm
font-medium
text-slate-700
"
>

Admin Email

</label>



<div
className="
relative
mt-2
"
>


<Mail
size={18}
className="
absolute
left-3
top-1/2
-transform
-y-1/2
text-slate-400
"
/>


<input

type="email"

required

value={formData.email}

onChange={(e)=>

setFormData({

...formData,

email:e.target.value

})

}

placeholder="admin@example.com"

className="
w-full
rounded-xl
border
border-slate-300
py-3
pl-10
pr-4
outline-none
focus:ring-2
focus:ring-black
"

/>


</div>


</div>







<div>


<label
className="
text-sm
font-medium
text-slate-700
"
>

Password

</label>



<div
className="
relative
mt-2
"
>


<Lock
size={18}
className="
absolute
left-3
top-1/2
-transform
-y-1/2
text-slate-400
"
/>



<input

type={
showPassword
?
"text"
:
"password"
}

required

value={formData.password}

onChange={(e)=>

setFormData({

...formData,

password:e.target.value

})

}

placeholder="Enter password"

className="
w-full
rounded-xl
border
border-slate-300
py-3
pl-10
pr-12
outline-none
focus:ring-2
focus:ring-black
"

/>



<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-slate-500
"

>


{
showPassword
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}


</button>


</div>


</div>







<label
className="
flex
items-center
gap-2
text-sm
text-slate-600
"
>


<input

type="checkbox"

checked={rememberMe}

onChange={(e)=>
setRememberMe(
e.target.checked
)
}

/>


Remember me


</label>








<button

type="submit"

disabled={loading}

className="
w-full
rounded-xl
bg-black
py-3
font-semibold
text-white
transition
hover:bg-slate-800
disabled:opacity-70
"

>


{
loading ?

(

<span
className="
flex
items-center
justify-center
gap-2
"
>

<Loader2
size={18}
className="
animate-spin
"
/>

Authenticating...

</span>

)

:

(
"Login to Dashboard"
)

}


</button>






</form>



</div>



</div>


);


}