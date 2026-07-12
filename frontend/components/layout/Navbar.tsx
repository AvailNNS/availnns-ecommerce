"use client";


import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Menu,
  ShoppingCart,
  User,
  Heart,
} from "lucide-react";


import { useRouter } from "next/navigation";


import SearchBar from "./SearchBar";

import MobileMenu from "./MobileMenu";


import useCart from "@/hooks/useCart";

import useWishlist from "@/hooks/useWishlist";





export default function Navbar() {


  const [mobileMenuOpen,setMobileMenuOpen] =
    useState(false);


  const [user,setUser] =
    useState<any>(null);



  const router = useRouter();



  const {
    totalItems
  } = useCart();



  const {
    wishlistCount
  } = useWishlist();








  useEffect(()=>{


    const savedUser =
      localStorage.getItem("user");



    if(savedUser){

      setUser(
        JSON.parse(savedUser)
      );

    }


  },[]);







  const logout = ()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    setUser(null);


    router.push("/login");


  };









  return (

<>


<header className="
border-b
bg-white
">


<div className="
mx-auto
flex
max-w-7xl
items-center
justify-between
gap-6
px-6
py-4
">





{/* Mobile Menu */}

<button

onClick={()=>
setMobileMenuOpen(true)
}

className="md:hidden"

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
"

>

NOPTRIX

</Link>









{/* Search */}

<div className="
flex-1
">

<SearchBar/>

</div>









{/* Right Menu */}

<div className="
flex
items-center
gap-5
shrink-0
">









{/* Wishlist */}


<Link

href="/wishlist"

className="relative"

>


<Heart size={22}/>



{
wishlistCount > 0 &&

<span className="
absolute
-right-2
-top-2
flex
h-5
w-5
items-center
justify-center
rounded-full
bg-red-500
text-[10px]
font-bold
text-white
">

{wishlistCount}

</span>

}



</Link>









{/* Cart */}


<Link

href="/cart"

className="relative"

>


<ShoppingCart size={22}/>





{
totalItems > 0 &&

<span className="
absolute
-right-2
-top-2
flex
h-5
w-5
items-center
justify-center
rounded-full
bg-black
text-[10px]
font-bold
text-white
">

{totalItems}

</span>

}



</Link>









{/* User */}

{

user ?

(

<div className="
flex
items-center
gap-3
">


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

<Link href="/login">

<User size={22}/>

</Link>

)

}





</div>






</div>


</header>









<MobileMenu

open={mobileMenuOpen}

onClose={()=>
setMobileMenuOpen(false)
}

/>



</>

);


}