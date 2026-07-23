"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import axios from "axios";

import {
  useForm,
} from "react-hook-form";

import {
  z
} from "zod";

import {
  zodResolver
} from "@hookform/resolvers/zod";


import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";


import {
  toast
} from "sonner";


import {
  useAuth
} from "@/context/AuthContext";



const registerSchema =
z.object({

  name:
  z.string()
  .min(
    2,
    "Name is required"
  ),


  email:
  z.string()
  .email(
    "Invalid email"
  ),


  phone:
  z.string()
  .regex(
    /^01[3-9]\d{8}$/,
    "Enter valid Bangladesh phone number"
  ),


  otp:
  z.string()
  .optional(),


  password:
  z.string()
  .min(
    6,
    "Password minimum 6 characters"
  ),


  confirmPassword:
  z.string(),


  terms:
  z.boolean()
  .refine(
    (value)=>value===true,
    {
      message:
      "Accept terms and conditions"
    }
  )


})
.refine(
(data)=>
data.password === data.confirmPassword,
{
  path:[
    "confirmPassword"
  ],
  message:
  "Passwords do not match"
}
);



type RegisterFormData =
z.infer<
typeof registerSchema
>;



export default function RegisterForm(){


const {
 register:signup
}=useAuth();



const [loading,setLoading]
=
useState(false);


const [
sendingOtp,
setSendingOtp
]
=
useState(false);



const [
verifyingOtp,
setVerifyingOtp
]
=
useState(false);



const [
showVerifyPage,
setShowVerifyPage
]
=
useState(false);



const [
countdown,
setCountdown
]
=
useState(0);



const [
showPassword,
setShowPassword
]
=
useState(false);



const [
showConfirmPassword,
setShowConfirmPassword
]
=
useState(false);



const API =
process.env.NEXT_PUBLIC_API_URL ||
"https://effective-telegram-qvvpg7qv66p9h9r79-5000.app.github.dev/api";



const {
 register,
 handleSubmit,
 watch,
 formState:{
 errors
 }

}
=
useForm<RegisterFormData>({

resolver:
zodResolver(
registerSchema
)

});



const phone =
watch("phone");


const otp =
watch("otp");


const password =
watch("password");

// ===============================
// OTP COUNTDOWN
// ===============================

useEffect(() => {

  if (countdown <= 0) return;


  const timer = setInterval(() => {

    setCountdown((prev)=>prev - 1);

  },1000);



  return () =>
    clearInterval(timer);


},[countdown]);




// ===============================
// SEND OTP
// ===============================

const handleSendOtp = async(phoneNumber: string)=>{

  try{

    setSendingOtp(true);

    const bdPhone = phoneNumber.startsWith("0")
      ? "+88" + phoneNumber
      : phoneNumber;


    const res =
    await axios.post(
      `${API}/phone-otp/send`,
      {
        phone: bdPhone
      }
    );



    toast.success(
      res.data.message ||
      "OTP sent successfully"
    );



    // development only
    if(res.data.otp){

      toast.info(
        `OTP: ${res.data.otp}`
      );

    }

    setCountdown(60);

  }
  catch(error:any){


    toast.error(
      error.response?.data?.message ||
      "OTP send failed"
    );


  }
  finally{


    setSendingOtp(false);


  }

};




// ===============================
// REGISTER SUBMIT (MOVES TO VERIFICATION PAGE)
// ===============================

const onSubmit = async (
  data: RegisterFormData
) => {

  const bdPhone = data.phone.startsWith("0")
    ? "+88" + data.phone
    : data.phone;

  await handleSendOtp(bdPhone);
  setShowVerifyPage(true);

};




// ===============================
// VERIFY OTP & COMPLETE SIGNUP
// ===============================

const handleVerifyAndRegister = async () => {

  if(!otp){
    toast.error("Please enter verification code");
    return;
  }

  const formData = watch();
  const bdPhone = formData.phone.startsWith("0")
    ? "+88" + formData.phone
    : formData.phone;

  try {

    setVerifyingOtp(true);

    await axios.post(
      `${API}/phone-otp/verify`,
      {
        phone: bdPhone,
        otp
      }
    );

    await signup({
      name: formData.name,
      email: formData.email,
      phone: bdPhone,
      password: formData.password,
    });

    toast.success("Account created successfully");

  } catch (error: any) {

    toast.error(
      error?.response?.data?.message ||
      "Verification or registration failed"
    );

  } finally {

    setVerifyingOtp(false);

  }

};




return (

<div>

{!showVerifyPage ? (

<form
onSubmit={
  handleSubmit(onSubmit)
}
className="
space-y-5
"
>


{/* =========================
    NAME
========================= */}

<div>

<label className="
text-sm
font-medium
">

Full Name

</label>


<input

type="text"

{...register("name")}

placeholder="John Doe"

className="
mt-2
w-full
rounded-2xl
border
px-4
py-3
"

 />


{
errors.name && (

<p className="
text-red-500
text-sm
mt-1
">

{errors.name.message}

</p>

)

}

</div>





{/* =========================
    EMAIL
========================= */}


<div>

<label className="
text-sm
font-medium
">

Email

</label>


<input

type="email"

{...register("email")}


placeholder="you@example.com"


className="
mt-2
w-full
rounded-2xl
border
px-4
py-3
"


/>


{
errors.email && (

<p className="
text-red-500
text-sm
mt-1
">

{errors.email.message}

</p>

)

}


</div>





{/* =========================
    PHONE
========================= */}


<div>


<label className="
text-sm
font-medium
">

Phone Number

</label>



<div className="
flex
items-center
mt-2
rounded-2xl
border
overflow-hidden
bg-white
">

<span className="
px-4
py-3
bg-gray-100
text-gray-600
border-r
font-medium
text-sm
">
  +88
</span>


<input


type="text"


{...register("phone")}


placeholder="017XXXXXXXX"


className="
flex-1
px-4
py-3
outline-none
bg-transparent
"


/>

</div>



{
errors.phone && (

<p className="
text-red-500
text-sm
mt-1
">

{errors.phone.message}

</p>

)

}


</div>





{/* =========================
    PASSWORD
========================= */}

<div>

<label className="
text-sm
font-medium
">

Password

</label>


<div className="
relative
mt-2
">


<input

type={
showPassword
?
"text"
:
"password"
}


{...register("password")}


placeholder="******"


className="
w-full
rounded-2xl
border
px-4
py-3
pr-12
"

/>



<button

type="button"


onClick={()=>
setShowPassword(
!showPassword
)
}


className="
absolute
right-4
top-1/2
-translate-y-1/2
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



{
errors.password && (

<p className="
text-red-500
text-sm
mt-1
">

{errors.password.message}

</p>

)

}



{/* PASSWORD STRENGTH */}

<div className="
flex
gap-2
mt-3
">


{[1,2,3,4].map(
(item)=>(

<div

key={item}

className={`
h-2
flex-1
rounded-full
${
password?.length >= item*3
?
"bg-green-500"
:
"bg-gray-200"
}
`}


/>

)

)}


</div>


</div>





{/* =========================
    CONFIRM PASSWORD
========================= */}


<div>


<label className="
text-sm
font-medium
">

Confirm Password

</label>



<div className="
relative
mt-2
">


<input


type={
showConfirmPassword
?
"text"
:
"password"
}


{...register(
"confirmPassword"
)}


placeholder="******"


className="
w-full
rounded-2xl
border
px-4
py-3
pr-12
"


/>



<button

type="button"


onClick={()=>
setShowConfirmPassword(
!showConfirmPassword
)
}


className="
absolute
right-4
top-1/2
-translate-y-1/2
"

>


{
showConfirmPassword
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}


</button>


</div>



{
errors.confirmPassword && (

<p className="
text-red-500
text-sm
mt-1
">

{
errors.confirmPassword.message
}

</p>

)

}


</div>





{/* =========================
    TERMS
========================= */}


<div>
<label className="
flex
items-start
gap-2
text-sm
">


<input

type="checkbox"

{...register(
"terms"
)}

/>


<span>

I agree to the Terms &
Conditions

</span>


</label>



{
errors.terms && (

<p className="
text-red-500
text-sm
mt-1
">

{
errors.terms.message
}

</p>

)

}
</div>



{/* SUBMIT BUTTON */}
<button
  type="submit"
  disabled={sendingOtp}
  className="w-full rounded-2xl bg-black text-white py-3 font-semibold hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
>
  {sendingOtp && <Loader2 className="animate-spin" size={18} />}
  {sendingOtp ? "Processing..." : "Register"}
</button>

</form>

) : (

<div className="space-y-5">

  <div className="text-center">
    <h2 className="text-xl font-bold">Verify Your Phone</h2>
    <p className="text-sm text-gray-500 mt-1">
      We have sent a verification code to your phone number.
    </p>
  </div>

  <div>
    <label className="text-sm font-medium">
      Verification Code
    </label>

    <input
      type="text"
      {...register("otp")}
      placeholder="Enter 6 digit OTP"
      className="mt-2 w-full rounded-2xl border px-4 py-3"
    />
  </div>

  <div className="flex items-center justify-between text-sm">
    <button
      type="button"
      onClick={() => handleSendOtp(phone)}
      disabled={countdown > 0 || sendingOtp}
      className="text-blue-600 font-medium disabled:text-gray-400"
    >
      {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
    </button>

    <button
      type="button"
      onClick={() => setShowVerifyPage(false)}
      className="text-gray-500 hover:underline"
    >
      Back to form
    </button>
  </div>

  <button
    type="button"
    onClick={handleVerifyAndRegister}
    disabled={verifyingOtp}
    className="w-full rounded-2xl bg-black text-white py-3 font-semibold hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
  >
    {verifyingOtp && <Loader2 className="animate-spin" size={18} />}
    {verifyingOtp ? "Verifying..." : "Verify & Complete Registration"}
  </button>

</div>

)}

</div>

);

}
