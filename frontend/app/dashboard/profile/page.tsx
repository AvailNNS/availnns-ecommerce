"use client";


import {
useEffect,
useState
} from "react";


import {
User,
Upload,
Save
} from "lucide-react";


import {
getMe,
updateProfile
} from "@/services/user.service";


import {
uploadAvatar
} from "@/services/upload.service";



export default function ProfilePage(){


const [user,setUser] =
useState<any>(null);



const [loading,setLoading] =
useState(false);



const [image,setImage] =
useState<File|null>(null);





const [form,setForm] =
useState({

name:"",
email:"",
phone:"",
address:"",
avatar:""

});






useEffect(()=>{


loadUser();


},[]);






const loadUser = async()=>{


const data =
await getMe();


setUser(data);


setForm({

name:data.name || "",

email:data.email || "",

phone:data.phone || "",

address:data.address || "",

avatar:data.avatar || ""

});


};







const handleImage = async(
e:any
)=>{


const file =
e.target.files[0];


if(!file)
return;



setImage(file);


const url =
await uploadAvatar(file);



setForm({

...form,

avatar:url

});



};







const handleSubmit = async()=>{


try{


setLoading(true);



await updateProfile(
form
);



alert(
"Profile updated"
);



}catch(error){


console.log(error);


}finally{


setLoading(false);


}



};







return (

<div
className="
max-w-3xl
bg-white
rounded-2xl
shadow-sm
p-6
"
>


<h1
className="
text-2xl
font-bold
mb-6
"
>

My Profile

</h1>





<div
className="
flex
items-center
gap-5
mb-8
"
>


<div
className="
w-24
h-24
rounded-full
bg-gray-200
overflow-hidden
flex
items-center
justify-center
"
>


{
form.avatar ?

<img
src={form.avatar}
className="
w-full
h-full
object-cover
"
/>

:

<User size={40}/>

}



</div>





<label
className="
cursor-pointer
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-black
text-white
"
>


<Upload size={18}/>

Upload


<input

type="file"

hidden

accept="image/*"

onChange={handleImage}

/>


</label>


</div>








<div className="space-y-4">



<input

value={form.name}

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

placeholder="Name"

className="
w-full
border
rounded-xl
px-4
py-3
"

/>





<input

value={form.email}

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

placeholder="Email"

className="
w-full
border
rounded-xl
px-4
py-3
"

/>





<input

value={form.phone}

onChange={(e)=>

setForm({

...form,

phone:e.target.value

})

}

placeholder="Phone Number"

className="
w-full
border
rounded-xl
px-4
py-3
"

/>





<textarea

value={form.address}

onChange={(e)=>

setForm({

...form,

address:e.target.value

})

}

placeholder="Address"

className="
w-full
border
rounded-xl
px-4
py-3
"

/>





<button

onClick={handleSubmit}

disabled={loading}

className="
flex
items-center
gap-2
bg-black
text-white
px-6
py-3
rounded-xl
"

>


<Save size={18}/>

{
loading
?
"Saving..."
:
"Save Changes"
}


</button>





</div>



</div>

);


}