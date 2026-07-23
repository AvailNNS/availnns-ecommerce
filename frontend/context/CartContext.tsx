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
    product:any,
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
// UPDATE CART STATE
// ==========================

const updateCartState=(data:any)=>{

const rawCart =
data?.cart ||
data ||
{
items:[]
};


const formattedItems = (rawCart.items || []).map((item: any) => {

  const prod = item.product || {};

  return {

    ...item,

    product: typeof prod === "string" ? { _id: prod } : {

      ...prod,

      name: prod.name || "Product",

      images: prod.images || [],

      price: prod.discountPrice || prod.price || item.price || 0,

      stock: prod.stock !== undefined ? prod.stock : 10,

    },

    price: item.price || prod.discountPrice || prod.price || 0

  };

});


setCart({

...rawCart,

items: formattedItems

});


};






// ==========================
// GUEST SAVE
// ==========================

const saveGuestCart=(items:any[])=>{

localStorage.setItem(
"guestCart",
JSON.stringify(items)
);

};




// ==========================
// GET GUEST CART
// ==========================

const getGuestCart=()=>{


return JSON.parse(

localStorage.getItem(
"guestCart"
)
||
"[]"

);


};








// ==========================
// LOAD CART
// ==========================

const refreshCart=async()=>{


try{


const token =
localStorage.getItem("token");



if(token){


const data =
await getCart();


updateCartState(data);



}

else{


const items =
getGuestCart();



updateCartState({ items });


}



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






useEffect(()=>{


refreshCart();


},[]);









// ==========================
// ADD ITEM
// ==========================


const addItem=async(

product:any,

quantity:number=1

)=>{


try{


setCartLoading(true);



const token =
localStorage.getItem("token");

const productId = typeof product === "string" ? product : product._id;



// LOGIN USER

if(token){


const data =
await addCartAPI(

productId,

quantity

);



updateCartState(data);



}





// GUEST USER

else{


const items =
getGuestCart();



const exist =
items.find(

(item:any)=>

(item.product?._id || item.product) === productId

);




if(exist){


exist.quantity += quantity;


}

else{


items.push({

product: typeof product === "object" ? product : {
  _id: productId,
  name: "Product",
  images: [],
  price: 0,
  stock: 10,
},

quantity


});


}





saveGuestCart(items);



updateCartState({ items });


}





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



const token =
localStorage.getItem("token");




if(token){


const data =
await updateCartAPI(

productId,

quantity

);



updateCartState(data);



}

else{


const items =
getGuestCart();



const item =
items.find(

(i:any)=>

(i.product?._id || i.product) === productId

);



if(item){


item.quantity = quantity;


}



saveGuestCart(items);



updateCartState({ items });



}




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



const token =
localStorage.getItem("token");





if(token){


const data =
await removeCartAPI(productId);


updateCartState(data);


}

else{


const items =
getGuestCart()
.filter(

(item:any)=>

(item.product?._id || item.product) !== productId

);



saveGuestCart(items);



updateCartState({ items });


}



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
// CLEAR CART
// ==========================


const clearCart=async()=>{


try{


setCartLoading(true);



const token =
localStorage.getItem("token");



if(token){


await clearCartAPI();


}



localStorage.removeItem(
"guestCart"
);



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
// TOTAL
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
useContext(CartContext);



if(!context){

throw new Error(
"useCart must be inside CartProvider"
);

}



return context;


}
