import type { Metadata } from "next";

import "./globals.css";

import AppProvider from "@/components/providers/AppProvider";

import MainLayout from "@/components/layout/MainLayout";


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


<MainLayout>

{children}

</MainLayout>


</AppProvider>


</body>


</html>

);

}