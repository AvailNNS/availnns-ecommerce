import api from "@/services/api";



// ===============================
// GET CURRENT USER
// ===============================

export const getMe = async()=>{


const res = await api.get(
"/auth/me"
);


return res.data.user;


};






// ===============================
// GET PROFILE
// ===============================

export const getProfile = async()=>{


const res = await api.get(
"/users/profile"
);


return res.data.user;


};







// ===============================
// UPDATE PROFILE
// ===============================

export const updateProfile = async(
data:any
)=>{


const res =
await api.put(

"/users/profile",

data

);


return res.data.user;


};







// ===============================
// CHANGE PASSWORD
// ===============================

export const changePassword = async(
data:any
)=>{


const res =
await api.put(

"/users/change-password",

data

);


return res.data;


};








// ===============================
// GET MY ORDERS
// ===============================

export const getMyOrders = async()=>{


const res = await api.get(
"/orders/my-orders"
);



return (

res.data.orders ||

[]

);


};








// ===============================
// USER DASHBOARD DATA
// ===============================

export const getUserDashboard = async()=>{


const user =
await getMe();



const orders =
await getMyOrders();





const stats={


totalOrders:
orders.length,



pendingOrders:
orders.filter(

(order:any)=>

order.orderStatus==="pending"

).length,



deliveredOrders:
orders.filter(

(order:any)=>

order.orderStatus==="delivered"

).length,



totalSpent:

orders.reduce(

(sum:number,order:any)=>

sum + Number(order.totalPrice || 0),

0

)


};







return {

user,

orders,

stats

};


};