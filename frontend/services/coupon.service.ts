import api from "./api";


export const getCoupons = async(
 token:string
)=>{

const res =
await api.get(
"/coupons",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

return res.data.coupons;

};




export const createCoupon = async(
data:any,
token:string
)=>{

const res =
await api.post(
"/coupons",
data,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


return res.data;

};




export const deleteCoupon = async(
id:string,
token:string
)=>{

const res =
await api.delete(
`/coupons/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


return res.data;

};

export const validateCoupon = async(
  code:string
)=>{

const res =
await api.post(
"/coupons/validate",
{
code
}
);


return res.data;

};