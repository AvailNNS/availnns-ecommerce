import type { Metadata } from "next";

import "./globals.css";


import AppProvider from "@/components/providers/AppProvider";

import MainLayout from "@/components/layout/MainLayout";

import {
  CurrencyProvider
} from "@/context/CurrencyContext";



export const metadata: Metadata = {

  title:"NOPTRIX",

  description:"Professional Ecommerce",

  other:{
    "format-detection":"telephone=no",
  },

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


<CurrencyProvider>


<MainLayout>

{children}

</MainLayout>


</CurrencyProvider>


</AppProvider>


</body>


</html>

);


}