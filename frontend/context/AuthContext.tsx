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



interface User {

  _id:string;

  name:string;

  email:string;

  phone?:string;

  role:string;

  avatar?:string;

}



interface AuthContextType {

  user:User|null;

  loading:boolean;

  login:(data:{
    email:string;
    password:string;
  })=>Promise<void>;


  register:(data:{
    name:string;
    email:string;
    phone:string;
    password:string;
  })=>Promise<void>;


  logout:()=>void;


  refreshUser:()=>Promise<void>;

}



const AuthContext =
createContext<AuthContextType|null>(null);





export function AuthProvider({
children
}:{
children:ReactNode;
}){


const router =
useRouter();


const [user,setUser]
=
useState<User|null>(null);


const [loading,setLoading]
=
useState(true);





// =======================
// GET CURRENT USER
// =======================

const refreshUser =
async()=>{


try{


const token =
Cookies.get("token");



if(!token){

setUser(null);

return;

}



const response =
await getMe();



setUser(
response.user || response
);



}

catch(error){


console.log(
"GET ME ERROR",
error
);



setUser(null);


Cookies.remove(
"token",
{
path:"/"
}
);


localStorage.removeItem(
"token"
);



}


};








// =======================
// SAVE TOKEN
// =======================

const saveToken =
(token:string)=>{


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








// =======================
// LOGIN
// =======================

const login =
async(data:any)=>{


const res =
await loginUser(data);



saveToken(
res.token
);



setUser(
res.user
);



window.dispatchEvent(
new Event("auth-change")
);



router.replace(
"/dashboard"
);



};









// =======================
// REGISTER
// =======================

const register =
async(data:any)=>{


const res =
await registerUser(data);



saveToken(
res.token
);



setUser(
res.user
);



window.dispatchEvent(
new Event("auth-change")
);



router.replace(
"/dashboard"
);



};









// =======================
// LOGOUT
// =======================

const logout = ()=>{


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



window.dispatchEvent(
new Event("auth-change")
);



router.replace(
"/login"
);



};









// =======================
// INITIAL LOAD
// =======================

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







export const useAuth = ()=>{


const context =
useContext(AuthContext);



if(!context){

throw new Error(
"useAuth must be used inside AuthProvider"
);

}



return context;


};