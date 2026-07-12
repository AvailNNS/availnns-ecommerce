"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


type WishlistItem = {
  _id: string;
  name?: string;
  price?: number;
  image?: string;
};



type WishlistContextType = {

  wishlist: WishlistItem[];

  addToWishlist: (
    item: WishlistItem
  ) => void;

  removeFromWishlist: (
    id: string
  ) => void;

  isInWishlist: (
    id: string
  ) => boolean;

  clearWishlist: () => void;

};




const WishlistContext =
createContext<WishlistContextType | null>(
  null
);







export function WishlistProvider({

  children,

}:{

  children:ReactNode;

}){



const [wishlist,setWishlist] =
useState<WishlistItem[]>([]);






// Load wishlist

useEffect(()=>{


  const saved =
  localStorage.getItem(
    "wishlist"
  );


  if(saved){

    setWishlist(
      JSON.parse(saved)
    );

  }


},[]);







// Save wishlist

useEffect(()=>{


  localStorage.setItem(

    "wishlist",

    JSON.stringify(wishlist)

  );


},[wishlist]);









// Add wishlist

const addToWishlist = (
  item:WishlistItem
)=>{


setWishlist((prev)=>{


const exists =
prev.some(
  (i)=>
  i._id === item._id
);



if(exists){

return prev;

}



return [

...prev,

item

];


});


};









// Remove wishlist

const removeFromWishlist = (
  id:string
)=>{


setWishlist((prev)=>

prev.filter(

(item)=>

item._id !== id

)

);


};









// Check wishlist

const isInWishlist = (
  id:string
)=>{


return wishlist.some(

(item)=>

item._id === id

);


};








// Clear wishlist

const clearWishlist = ()=>{


setWishlist([]);


};









return (

<WishlistContext.Provider

value={{

wishlist,

addToWishlist,

removeFromWishlist,

isInWishlist,

clearWishlist,

}}

>


{children}


</WishlistContext.Provider>


);


}









export function useWishlist(){


const context =
useContext(
  WishlistContext
);



if(!context){


throw new Error(
"useWishlist must be used inside WishlistProvider"
);


}



return context;


}