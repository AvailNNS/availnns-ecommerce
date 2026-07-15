import api from "./api";




// =======================
// GET ADMIN PROFILE
// =======================

export const getAdminProfile = async(
 token:string
)=>{


try{


const res = await api.get(

"/admin/profile",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);


return res.data;



}catch(error:any){


throw new Error(

error.response?.data?.message ||
"Failed to fetch admin profile"

);


}


};







// =======================
// GET ALL CUSTOMERS
// =======================

export const getAdminCustomers = async(
 token:string
)=>{


try{


const res = await api.get(

"/admin/customers",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



return res.data;



}catch(error:any){


throw new Error(

error.response?.data?.message ||
"Failed to fetch customers"

);


}


};







// =======================
// UPDATE ADMIN SETTINGS
// =======================

export const updateAdminSettings = async(

data:any,

token:string

)=>{


try{


const res = await api.put(

"/admin/settings",

data,

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);



return res.data;



}catch(error:any){


throw new Error(

error.response?.data?.message ||
"Failed to update settings"

);


}


};