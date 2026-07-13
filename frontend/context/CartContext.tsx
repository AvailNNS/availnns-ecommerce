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
  clearCart as clearCartAPI,
} from "@/services/cart.service";



type CartContextType = {

  cart:any;

  totalItems:number;

  loading:boolean;

  addItem:
  (
    productId:string,
    quantity:number
  )=>Promise<void>;


  updateItem:
  (
    productId:string,
    quantity:number
  )=>Promise<void>;


  removeItem:
  (
    productId:string
  )=>Promise<void>;


  refreshCart:
  ()=>Promise<void>;


  clearCart:
  ()=>Promise<void>;

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
useState<any>({

items:[]

});



const [loading,setLoading] =
useState(true);



// =============================
// SET CART DATA
// =============================

const setCartData = (data:any)=>{


console.log(
"🔥 CART DATA:",
data
);



const newCart =

data?.cart ||

data ||

{
items:[]
};



setCart({

...newCart,

items:
newCart?.items || []

});


};









// =============================
// GET CART
// =============================
const refreshCart = async () => {
  try {
    console.log("🚀 refreshCart started");

    const data = await getCart();

    console.log("✅ GET CART RESPONSE:");
    console.log(data);

    setCartData(data);
  } catch (error) {
    console.log("❌ GET CART ERROR:");
    console.log(error);

    setCart({
      items: [],
    });
  } finally {
    console.log("🏁 refreshCart finished");

    setLoading(false);
  }
};



// =============================
// LOAD
// =============================

useEffect(() => {
  console.log("🟢 CartProvider mounted");

  const token = localStorage.getItem("token");

  console.log("🔑 TOKEN:", token);

  if (token) {
    refreshCart();
  } else {
    console.log("❌ No token found");

    setLoading(false);
  }
}, []);

// =============================
// ADD
// =============================

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



console.log(
"🔥 ADD RESPONSE:",
data
);



setCartData(data);



}catch(error){


console.log(
"ADD CART ERROR:",
error
);


}


};









// =============================
// UPDATE
// =============================

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



setCartData(data);



}catch(error){


console.log(
"UPDATE ERROR:",
error
);


}


};









// =============================
// REMOVE
// =============================

const removeItem = async(

productId:string

)=>{


try{


const data =
await removeCartAPI(

productId

);



setCartData(data);



}catch(error){


console.log(
"REMOVE ERROR:",
error
);


}


};









// =============================
// CLEAR
// =============================

const clearCart = async()=>{


try{


await clearCartAPI();



setCart({

items:[]

});



}catch(error){


console.log(
"CLEAR CART ERROR:",
error
);


}


};









// =============================
// TOTAL ITEMS
// =============================

const totalItems =

cart?.items?.reduce(

(
sum:number,
item:any
)=>

sum +
Number(item.quantity || 0),

0

) || 0;









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

clearCart,

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