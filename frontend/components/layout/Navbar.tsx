"use client";

import { useState } from "react";

import Link from "next/link";

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
import { useAuth } from "@/context/AuthContext";



export default function Navbar(){


const [
  mobileMenuOpen,
  setMobileMenuOpen
]=useState(false);



const [
  cartOpen,
  setCartOpen
]=useState(false);





const {
  totalItems
}=useCart();





const {
  wishlist
}=useWishlist();


const wishlistCount =
wishlist.length;





const {
  user
}=useAuth();








return (

<>

<header

className="
sticky
top-0
z-50
bg-white
border-b
shadow-sm
"

>


<div

className="
max-w-7xl
mx-auto
px-6
py-4
flex
items-center
justify-between
gap-5
"

>



{/* Mobile Menu */}

<button

onClick={()=>
setMobileMenuOpen(true)
}

className="
md:hidden
text-gray-600
"

>

<Menu size={25}/>

</button>







{/* Logo */}

<Link

href="/"

className="
text-2xl
font-black
tracking-wide
"

>

NOPTRIX

</Link>








{/* Search */}

<div

className="
hidden
md:flex
flex-1
max-w-xl
"

>

<SearchBar/>

</div>









{/* Actions */}

<div

className="
flex
items-center
gap-5
"

>







{/* Wishlist */}

<Link

href="/wishlist"

className="
relative
hover:text-red-500
transition
"

>

<Heart size={23}/>


{
wishlistCount > 0 &&

<span

className="
absolute
-top-2
-right-2
bg-red-500
text-white
text-[10px]
w-5
h-5
rounded-full
flex
items-center
justify-center
font-bold
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

onClick={()=>
setCartOpen(true)
}

className="
relative
hover:text-blue-600
transition
"

>

<ShoppingCart size={23}/>


{
totalItems > 0 &&

<span

className="
absolute
-top-2
-right-2
bg-black
text-white
text-[10px]
w-5
h-5
rounded-full
flex
items-center
justify-center
font-bold
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









{/* Account */}

{

user ?

(

<Link

href="/dashboard"

className="
flex
items-center
gap-2
border-l
pl-5
hover:text-blue-600
transition
"

>

<User size={23}/>


<span

className="
hidden
sm:block
font-medium
text-sm
"

>

{user.name}

</span>


</Link>

)


:


(

<Link

href="/login"

className="
hover:text-blue-600
transition
"

>

<User size={23}/>

</Link>

)

}




</div>



</div>









{/* Mobile Search */}

<div

className="
md:hidden
border-t
px-6
py-3
"

>

<SearchBar/>

</div>



</header>









{/* Cart Drawer */}

<CartDrawer

open={cartOpen}

onClose={()=>
setCartOpen(false)
}

/>








{/* Mobile Menu */}

<MobileMenu

open={mobileMenuOpen}

onClose={()=>
setMobileMenuOpen(false)
}

/>



</>

);


}