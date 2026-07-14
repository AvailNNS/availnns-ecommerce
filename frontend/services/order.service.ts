import api from "@/services/api";


// =========================
// CREATE ORDER
// =========================

export const createOrder = async (
  data:any
)=>{

  const res = await api.post(
    "/orders",
    data
  );


  return res.data;

};

// =========================
// GET MY ORDERS
// =========================

export const getMyOrders = async()=>{


  const res = await api.get(
    "/orders"
  );


  return res.data.orders || [];


};

// =========================
// GET MY ORDERS by id
// =========================

export const getOrderById = async(
  id:string
)=>{
  const res = await api.get(
    `/orders/${id}`
  );
  return res.data.order || [];

};


// =========================
// GET ADMIN ORDERS
// =========================

export const getAdminOrders = async(
  token:string
)=>{


  const res = await api.get(
    "/orders/admin",
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );


  return res.data.orders || [];

};




// =========================
// UPDATE ORDER STATUS
// =========================

export const updateOrderStatus = async(
  id:string,
  status:string,
  token:string
)=>{


  const res = await api.put(

    `/orders/admin/${id}`,

    {
      status
    },

    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

  );


  return res.data;

};
