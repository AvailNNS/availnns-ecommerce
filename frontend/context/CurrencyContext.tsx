"use client";


import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


import api from "@/services/api";



type CurrencyType = {

  currency:string;

  symbol:string;

  currencyPosition:"before" | "after";

  rate:number;

};




type CurrencyContextType = {

  currency:CurrencyType;

  formatPrice:(price:number)=>string;

  loadCurrency:()=>void;

};





const CurrencyContext =
createContext<CurrencyContextType | null>(null);







export function CurrencyProvider({
children
}:{
children:React.ReactNode;
}){



const [currency,setCurrency]=
useState<CurrencyType>({

  currency:"USD",

  symbol:"$",

  currencyPosition:"before",

  rate:1,

});








const loadCurrency = async()=>{


try{


const res =
await api.get("/settings");



const settings =
res.data.settings || res.data;





setCurrency({

currency:
settings.currency || "USD",


symbol:
settings.symbol || "$",


currencyPosition:
settings.currencyPosition || "before",


rate:
Number(settings.rate) || 1,


});



}catch(error){


console.log(
"Currency Load Error:",
error
);


}


};








useEffect(()=>{


loadCurrency();


},[]);









const formatPrice=(price:number)=>{


const convertedPrice =
price * currency.rate;



const amount =
convertedPrice.toFixed(2);






if(
currency.currencyPosition==="after"
){


return `${amount}${currency.symbol}`;


}






return `${currency.symbol}${amount}`;


};








return (


<CurrencyContext.Provider

value={{

currency,

formatPrice,

loadCurrency,

}}

>


{children}


</CurrencyContext.Provider>


);


}









export function useCurrency(){



const context =
useContext(CurrencyContext);




if(!context){


throw new Error(
"useCurrency must be used inside CurrencyProvider"
);


}



return context;



}