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

  cartLoading:boolean;


  addItem:
  (
    productId:string,
    quantity?:number
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


  clearCart:
  ()=>Promise<void>;


  refreshCart:
  ()=>Promise<void>;

};




const CartContext =
createContext<CartContextType | null>(null);





export function CartProvider({
children
}:{
children:React.ReactNode;
}){


const [cart,setCart]=useState<any>({
items:[]
});



const [loading,setLoading]=useState(true);



const [cartLoading,setCartLoading]=useState(false);





// ==========================
// SET CART
// ==========================


const updateCartState=(data:any)=>{


const newCart =
data?.cart ||
data ||
{
items:[]
};



setCart({

...newCart,

items:
newCart.items || []

});


};






// ==========================
// FETCH CART
// ==========================


const refreshCart=async()=>{


try{


const data =
await getCart();


updateCartState(data);


}
catch(error){


console.log(
"GET CART ERROR",
error
);


setCart({
items:[]
});


}

finally{


setLoading(false);


}


};







// ==========================
// INITIAL LOAD
// ==========================


useEffect(()=>{


const token =
localStorage.getItem(
"token"
);



if(token){

refreshCart();

}
else{

setLoading(false);

}



},[]);









// ==========================
// ADD ITEM
// ==========================


const addItem=async(

productId:string,

quantity:number=1

)=>{


try{


setCartLoading(true);



const data =
await addCartAPI(
productId,
quantity
);



updateCartState(data);



}
catch(error){


console.log(
"ADD CART ERROR",
error
);


}

finally{


setCartLoading(false);


}


};










// ==========================
// UPDATE ITEM
// ==========================


const updateItem=async(

productId:string,

quantity:number

)=>{


try{


setCartLoading(true);



const data =
await updateCartAPI(
productId,
quantity
);



updateCartState(data);



}
catch(error){


console.log(
"UPDATE CART ERROR",
error
);


}

finally{


setCartLoading(false);


}



};









// ==========================
// REMOVE ITEM
// ==========================


const removeItem=async(

productId:string

)=>{


try{


setCartLoading(true);



const data =
await removeCartAPI(
productId
);



updateCartState(data);



}
catch(error){


console.log(
"REMOVE CART ERROR",
error
);


}

finally{


setCartLoading(false);


}


};









// ==========================
// CLEAR
// ==========================


const clearCart=async()=>{


try{


setCartLoading(true);


await clearCartAPI();


setCart({
items:[]
});


}
catch(error){


console.log(
"CLEAR CART ERROR",
error
);


}

finally{


setCartLoading(false);


}



};









// ==========================
// TOTAL COUNT
// ==========================


const totalItems =

cart?.items?.reduce(

(
total:number,
item:any
)=>

total +
Number(item.quantity || 0)

,0)

||0;







return (

<CartContext.Provider

value={{

cart,

totalItems,

loading,

cartLoading,

addItem,

updateItem,

removeItem,

clearCart,

refreshCart,

}}

>


{children}


</CartContext.Provider>


);


}







export default function useCartContext(){


const context =
useContext(
CartContext
);



if(!context){

throw new Error(
"useCart must be inside CartProvider"
);

}



return context;


}