import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://effective-telegram-qvvpg7qv66p9h9r79-5000.app.github.dev/api",
});


api.interceptors.request.use((config) => {

  if(typeof window !== "undefined"){

    const token = localStorage.getItem("token");

    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }

  }

  return config;

});


export default api;