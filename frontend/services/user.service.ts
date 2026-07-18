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
// GET MY ORDERS
// ===============================

export const getMyOrders = async()=>{

const res = await api.get(
"/orders"
);

return res.data.orders || [];

};



// ===============================
// USER DASHBOARD DATA
// ===============================

export const getUserDashboard = async()=>{


const user = await getMe();

const orders = await getMyOrders();


return {

user,

orders,

orderCount: orders.length

};


};