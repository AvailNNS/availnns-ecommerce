import api from "@/services/api";



// ===============================
// INITIATE SSL PAYMENT
// ===============================

export const initiatePayment = async (
 data:any
)=>{


const res =
await api.post(
"/payments/initiate",
data
);


return res.data;


};





// ===============================
// PAYMENT SUCCESS
// ===============================

export const paymentSuccess = async(
data:any
)=>{


const res =
await api.post(
"/payments/success",
data
);


return res.data;


};





// ===============================
// PAYMENT FAILED
// ===============================

export const paymentFail = async(
data:any
)=>{


const res =
await api.post(
"/payments/fail",
data
);


return res.data;


};





// ===============================
// PAYMENT CANCEL
// ===============================

export const paymentCancel = async(
data:any
)=>{


const res =
await api.post(
"/payments/cancel",
data
);


return res.data;


};