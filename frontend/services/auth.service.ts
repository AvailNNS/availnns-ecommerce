import api from "./api";


// =========================
// LOGIN
// =========================

export const loginUser = async (
  data:{
    email:string;
    password:string;
  }
)=>{

  const res = await api.post(
    "/auth/login",
    data
  );

  return res.data;

};


// =========================
// REGISTER
// =========================

export const registerUser = async (
  data:{
    name:string;
    email:string;
    phone:string;
    password:string;
  }
)=>{

  const res = await api.post(
    "/auth/register",
    data
  );

  return res.data;

};


// =========================
// GET CURRENT USER
// =========================

export const getMe = async()=>{

  const res = await api.get(
    "/auth/me"
  );

  // শুধু user return করবে

  return res.data.user;

};