"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart as addCartAPI,
  updateCart as updateCartAPI,
  removeCartItem as removeCartAPI,
} from "@/services/cart.service";



type CartContextType = {

  cart:any;

  totalItems:number;

  loading:boolean;

  addItem:(productId:string, quantity:number)=>Promise<void>;

  updateItem:(productId:string, quantity:number)=>Promise<void>;

  removeItem:(productId:string)=>Promise<void>;

  refreshCart:()=>Promise<void>;

};



const CartContext =
createContext<CartContextType | undefined>(
  undefined
);





export function CartProvider({
  children
}:{
  children:React.ReactNode;
}){


const [cart,setCart] =
useState<any>(null);


const [loading,setLoading] =
useState(true);






// =========================
// GET CART
// =========================

const refreshCart = async()=>{


try{


const data =
await getCart();


setCart(
  data.cart
);


}catch(error){


console.log(
  "Cart load error:",
  error
);


}finally{


setLoading(false);


}


};









// =========================
// LOAD CART
// =========================

useEffect(()=>{


const token =
localStorage.getItem("token");


if(token){

refreshCart();

}else{

setLoading(false);

}


},[]);









// =========================
// ADD ITEM
// =========================

const addItem = async(
  productId:string,
  quantity:number
)=>{


try{


const data =
await addCartAPI(
  productId,
  quantity
);



setCart(
  data.cart
);



}catch(error){


console.log(
  "Add cart error:",
  error
);


}


};









// =========================
// UPDATE ITEM
// =========================

const updateItem = async(
  productId:string,
  quantity:number
)=>{


try{


const data =
await updateCartAPI(
  productId,
  quantity
);



setCart(
  data.cart
);



}catch(error){


console.log(
  "Update cart error:",
  error
);


}


};









// =========================
// REMOVE ITEM
// =========================

const removeItem = async(
  productId:string
)=>{


try{


const data =
await removeCartAPI(
  productId
);



setCart(
  data.cart
);



}catch(error){


console.log(
  "Remove cart error:",
  error
);


}


};









// =========================
// CART PRODUCT COUNT
// =========================

const totalItems =
cart?.items?.length || 0;









return (

<CartContext.Provider

value={{

cart,

totalItems,

loading,

addItem,

updateItem,

removeItem,

refreshCart,

}}

>


{children}


</CartContext.Provider>


);


}










export default function useCartContext(){


const context =
useContext(CartContext);



if(!context){


throw new Error(
"useCartContext must be inside CartProvider"
);


}



return context;


}