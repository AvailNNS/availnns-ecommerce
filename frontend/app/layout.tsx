import type { Metadata } from "next";

import "./globals.css";


import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import AppProvider from "@/components/providers/AppProvider";



export const metadata: Metadata = {

  title:"NOPTRIX",

  description:"Professional Ecommerce",

};




export default function RootLayout({

children,

}:Readonly<{

children:React.ReactNode;

}>) {


return (

<html lang="en">


<body>


<AppProvider>


<Header />


<main>

{children}

</main>



<Footer />


</AppProvider>


</body>


</html>

);

}