"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Menu,
  ShoppingCart,
  User,
  Heart,
} from "lucide-react";


// Components
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import CartDrawer from "@/components/cart/CartDrawer";


// Hooks
import useCart from "@/hooks/useCart";


// Context
import { useWishlist } from "@/context/WishlistContext";



interface UserData {
  name:string;
  email?:string;
}



export default function Navbar(){


const router = useRouter();



const [
  mobileMenuOpen,
  setMobileMenuOpen
]=useState(false);



const [
  cartOpen,
  setCartOpen
]=useState(false);



const [
  user,
  setUser
]=useState<UserData | null>(null);





const {
  totalItems
}=useCart();





const {
  wishlist
}=useWishlist();



const wishlistCount =
wishlist.length;







useEffect(()=>{


try{


const savedUser =
localStorage.getItem("user");



if(savedUser){

setUser(
JSON.parse(savedUser)
);

}



}catch(error){

console.log(
"User load error",
error
);


}


},[]);







const logout = ()=>{


localStorage.removeItem(
"token"
);


localStorage.removeItem(
"user"
);


setUser(null);


router.push(
"/login"
);


};









return (

<>


<header

className="
sticky
top-0
z-50
border-b
bg-white
shadow-sm
"

>


<div

className="
mx-auto
flex
max-w-7xl
items-center
justify-between
gap-4
px-6
py-4
md:gap-6
"

>





{/* Mobile Menu */}

<button

onClick={()=>setMobileMenuOpen(true)}

className="
p-1
text-gray-600
md:hidden
"

>

<Menu size={24}/>

</button>







{/* Logo */}

<Link

href="/"

className="
shrink-0
text-2xl
font-bold
tracking-tight
"

>

NOPTRIX

</Link>







{/* Search */}

<div

className="
hidden
flex-1
md:block
"

>

<SearchBar/>

</div>







{/* Right */}

<div

className="
flex
items-center
gap-4
sm:gap-5
"

>







{/* Wishlist */}

<Link

href="/wishlist"

className="
relative
p-1
"

>

<Heart size={22}/>



{
wishlistCount > 0 &&

<span

className="
absolute
-right-1
-top-1
flex
h-4
w-4
items-center
justify-center
rounded-full
bg-red-500
text-[10px]
font-bold
text-white
"

>

{
wishlistCount > 99
?
"99+"
:
wishlistCount
}

</span>

}


</Link>








{/* Cart */}

<button

onClick={()=>setCartOpen(true)}

className="
relative
p-1
"

>


<ShoppingCart size={22}/>




{
totalItems > 0 &&

<span

className="
absolute
-right-1
-top-1
flex
h-4
w-4
items-center
justify-center
rounded-full
bg-black
text-[10px]
font-bold
text-white
"

>

{
totalItems > 99
?
"99+"
:
totalItems
}

</span>

}



</button>








{/* User */}


{

user ?

(

<div

className="
flex
items-center
gap-3
border-l
pl-4
"

>


<Link

href="/dashboard"

className="
hidden
text-sm
font-medium
sm:block
hover:text-blue-600
"

>

{user.name}

</Link>




<button

onClick={logout}

className="
text-sm
font-medium
text-red-500
hover:text-red-700
"

>

Logout

</button>



</div>

)


:


(

<Link

href="/login"

className="p-1"

>

<User size={22}/>

</Link>

)

}



</div>





</div>







{/* Mobile Search */}

<div

className="
border-t
px-6
py-3
md:hidden
"

>

<SearchBar/>

</div>




</header>







{/* Cart Drawer */}

<CartDrawer

open={cartOpen}

onClose={()=>setCartOpen(false)}

/>







{/* Mobile Menu */}

<MobileMenu

open={mobileMenuOpen}

onClose={()=>setMobileMenuOpen(false)}

/>



</>

);


}