import api from "./api";


// =========================
// GET CART
// =========================

export const getCart = async()=>{

const res =
await api.get("/cart");

return res.data;

};



// =========================
// ADD CART
// =========================

export const addToCart = async(
productId:string,
quantity:number=1
)=>{

const res =
await api.post(
"/cart/add",
{
productId,
quantity
}
);

return res.data;

};



// =========================
// MERGE GUEST CART
// =========================

export const mergeCart = async(
items:any[]
)=>{


const res =
await api.post(
"/cart/merge",
{
items
}
);


return res.data;


};



// =========================
// UPDATE
// =========================

export const updateCart = async(
productId:string,
quantity:number
)=>{


const res =
await api.put(
"/cart/update",
{
productId,
quantity
}
);


return res.data;


};



// =========================
// REMOVE
// =========================

export const removeCartItem = async(
productId:string
)=>{


const res =
await api.post(
"/cart/remove",
{
productId
}
);


return res.data;


};



// =========================
// CLEAR
// =========================

export const clearCart = async()=>{


const res =
await api.delete(
"/cart/clear"
);


return res.data;


};