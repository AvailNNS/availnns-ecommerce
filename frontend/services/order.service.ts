import api from "@/services/api";



// =========================
// CREATE ORDER
// =========================

export const createOrder = async(
 data:any
)=>{

const res =
await api.post(
"/orders",
data
);


return res.data;

};




// =========================
// GET MY ORDERS
// =========================

export const getMyOrders = async()=>{

const res =
await api.get(
"/orders/my-orders"
);


return res.data.orders || [];

};




// =========================
// GET ORDER BY ID
// =========================

export const getOrderById = async(
 id:string,
 token:string
)=>{


const res =
await api.get(

`/orders/${id}`,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


return res.data.order || res.data;


};






// =========================
// GET ADMIN ORDERS
// =========================

export const getAdminOrders = async(
 token:string
)=>{


const res =
await api.get(

"/admin/orders",

{

headers:{

Authorization:
`Bearer ${token}`

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


const res =
await api.put(


`/admin/orders/${id}/status`,


{

status

},


{

headers:{

Authorization:
`Bearer ${token}`

}

}


);



return res.data;


};







// =========================
// UPDATE PAYMENT
// =========================

export const updatePayment = async(

id:string,

paymentMethod:string,

paymentStatus:string,

token:string

)=>{


const res =
await api.put(

`/admin/orders/${id}/payment`,


{

paymentMethod,

paymentStatus

},


{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



return res.data;


};