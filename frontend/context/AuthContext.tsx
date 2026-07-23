"use client";


import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


import Cookies from "js-cookie";

import {
  useRouter,
} from "next/navigation";


import {
  loginUser,
  registerUser,
  getMe,
} from "@/services/auth.service";




// =====================
// USER TYPE
// =====================

interface User {

  _id:string;

  name:string;

  email:string;

  phone?:string;

  role:string;

  avatar?:string;

}






// =====================
// LOGIN TYPE
// =====================

interface LoginData {

  email:string;

  password:string;

}






// =====================
// REGISTER TYPE
// =====================

interface RegisterData {

  name:string;

  email:string;

  phone:string;

  password:string;

}






// =====================
// CONTEXT TYPE
// =====================

interface AuthContextType {


 user:User|null;


 loading:boolean;



 login:
 (
  data:LoginData
 )=>Promise<void>;



 register:
 (
  data:RegisterData
 )=>Promise<void>;



 logout:
 ()=>void;



 refreshUser:
 ()=>Promise<void>;


}







const AuthContext =
createContext<AuthContextType|null>(null);








// =====================
// PROVIDER
// =====================


export function AuthProvider({

children

}:{

children:ReactNode;

}){



const router =
useRouter();




const [user,setUser] =
useState<User|null>(null);



const [loading,setLoading] =
useState(true);








// =====================
// GET CURRENT USER
// =====================


const refreshUser =
async()=>{


try{


const token =

Cookies.get("token")

||

localStorage.getItem(
"token"
);





if(!token){


setUser(null);

return;


}






const res =
await getMe();



setUser(
res.user
);



}

catch(error){


console.log(
"GET USER ERROR",
error
);



Cookies.remove(
"token",
{
path:"/"
}
);



localStorage.removeItem(
"token"
);



setUser(null);



}


};









// =====================
// SAVE TOKEN
// =====================

const saveToken=(token:string)=>{


Cookies.set(

"token",

token,

{

expires:7,

path:"/"

}

);



localStorage.setItem(

"token",

token

);


};









// =====================
// LOGIN
// =====================

const login =
async(
data:LoginData
)=>{


const res =
await loginUser(
data
);




saveToken(
res.token
);




setUser(
res.user
);




// merge guest cart

window.dispatchEvent(

new Event(
"cart-login"
)

);





router.replace(
"/dashboard"
);



};









// =====================
// REGISTER
// =====================


const register =
async(
data:RegisterData
)=>{


const res =
await registerUser(
data
);




saveToken(
res.token
);




setUser(
res.user
);





window.dispatchEvent(

new Event(
"cart-login"
)

);






router.replace(
"/dashboard"
);



};









// =====================
// LOGOUT
// =====================


const logout =
()=>{


Cookies.remove(

"token",

{

path:"/"

}

);




localStorage.removeItem(
"token"
);



setUser(null);



router.replace(
"/login"
);



};









// =====================
// INIT
// =====================


useEffect(()=>{


const init =
async()=>{


try{


await refreshUser();



}

finally{


setLoading(false);



}



};



init();



},[]);









return (

<AuthContext.Provider

value={{

user,

loading,

login,

register,

logout,

refreshUser,

}}

>


{children}


</AuthContext.Provider>


);


}









// =====================
// HOOK
// =====================


export const useAuth=()=>{


const context =
useContext(
AuthContext
);



if(!context){


throw new Error(

"useAuth must be used inside AuthProvider"

);


}



return context;


};