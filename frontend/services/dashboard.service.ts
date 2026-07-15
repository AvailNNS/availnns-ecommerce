import api from "./api";



// =======================
// COMMON HEADER
// =======================

const authHeader = (token:string)=>({

headers:{
Authorization:`Bearer ${token}`,
},

});






// =======================
// GET DASHBOARD STATS
// =======================

export const getDashboardStats = async(
  token:string
)=>{


try{


const res = await api.get(

"/admin/dashboard/stats",

authHeader(token)

);



return res.data.stats || res.data;



}catch(error:any){


throw new Error(

error.response?.data?.message ||

"Failed to fetch dashboard stats"

);


}


};








// =======================
// GET RECENT ORDERS
// =======================


export const getRecentOrders = async(
token:string
)=>{


try{


const res = await api.get(

"/admin/dashboard/recent-orders",

authHeader(token)

);



return res.data.orders || [];



}catch(error:any){


throw new Error(

error.response?.data?.message ||

"Failed to fetch recent orders"

);


}


};









// =======================
// ORDER STATUS
// =======================


export const getOrderStatusStats = async(
token:string
)=>{


try{


const res = await api.get(

"/admin/dashboard/order-status",

authHeader(token)

);



return res.data.status || [];



}catch(error:any){


throw new Error(

error.response?.data?.message ||

"Failed to fetch order status"

);


}


};









// =======================
// TOP PRODUCTS
// =======================


export const getTopProducts = async(
token:string
)=>{


try{


const res = await api.get(

"/admin/dashboard/top-products",

authHeader(token)

);



return res.data.products || [];



}catch(error:any){


throw new Error(

error.response?.data?.message ||

"Failed to fetch top products"

);


}


};









// =======================
// MONTHLY SALES
// =======================


export const getMonthlySales = async(
token:string
)=>{


try{


const res = await api.get(

"/admin/dashboard/monthly-sales",

authHeader(token)

);



return res.data.sales || [];



}catch(error:any){


throw new Error(

error.response?.data?.message ||

"Failed to fetch sales data"

);


}


};